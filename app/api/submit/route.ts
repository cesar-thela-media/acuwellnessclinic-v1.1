import { NextResponse } from "next/server";
import { z } from "zod";
import {
  contactPayloadSchema,
  newsletterPayloadSchema,
  schedulePayloadSchema,
  submitBodySchema,
  type SubmitType,
} from "@/lib/forms";

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 32_000;
const WEBHOOK_TIMEOUT_MS = 8_000;

function webhookFor(type: SubmitType): string | undefined {
  const map: Record<SubmitType, string | undefined> = {
    contact: process.env.WEBHOOK_URL_CONTACT,
    newsletter: process.env.WEBHOOK_URL_NEWSLETTER,
    schedule: process.env.WEBHOOK_URL_SCHEDULE,
  };
  const url = map[type]?.trim();
  return url || undefined;
}

function schemaFor(type: SubmitType) {
  if (type === "contact") return contactPayloadSchema;
  if (type === "newsletter") return newsletterPayloadSchema;
  return schedulePayloadSchema;
}

export async function POST(req: Request) {
  try {
    const contentLength = Number(req.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request is too large" }, { status: 413 });
    }

    let json: unknown;
    try {
      json = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    const parsed = submitBodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { type, payload } = parsed.data;
    const validated = schemaFor(type).safeParse(payload);
    if (!validated.success) {
      return NextResponse.json(
        { error: `Invalid ${type} form`, details: validated.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const webhookUrl = webhookFor(type);
    if (!webhookUrl) {
      if (process.env.NODE_ENV === "production") {
        console.error(`[submit] ${type} webhook is not configured`);
        return NextResponse.json(
          { error: "Submission is temporarily unavailable" },
          { status: 503 },
        );
      }
      console.info(`[submit] ${type} accepted in development; webhook not configured`);
      return NextResponse.json({ ok: true, type, delivered: false, development: true });
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        payload: validated.data,
        receivedAt: new Date().toISOString(),
        source: "acuwellnessclinic",
      }),
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`[submit] webhook ${type} failed`, res.status);
      return NextResponse.json({ error: "Webhook delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, type, delivered: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    console.error("[submit] request failed", err instanceof Error ? err.message : "unknown error");
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
