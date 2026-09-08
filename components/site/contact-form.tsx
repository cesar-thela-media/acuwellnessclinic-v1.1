"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SUBJECTS = [
  "General",
  "Appointment Request",
  "Testimonial Submission",
  "Question",
  "Comment",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      firstName: String(form.get("firstName") || ""),
      lastName: String(form.get("lastName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || ""),
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "contact", payload }),
      });
      if (!res.ok) throw new Error("submit failed");
      formEl.reset();
      setStatus("ok");
    } catch {
      setStatus("err");
      setError("Submission is temporarily unavailable.");
    }
  }

  return (
    <form onSubmit={onSubmit} method="post" className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-charcoal">
            First Name
          </Label>
          <Input id="firstName" name="firstName" required className="h-11 rounded-[14px] border border-forest/20" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-charcoal">
            Last Name
          </Label>
          <Input id="lastName" name="lastName" required className="h-11 rounded-[14px] border border-forest/20" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-sm font-medium text-charcoal">
          Email
        </Label>
        <Input id="email" name="email" type="email" required className="h-11 rounded-[14px] border border-forest/20" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-sm font-medium text-charcoal">
          Phone/Mobile
        </Label>
        <Input id="phone" name="phone" type="tel" required className="h-11 rounded-[14px] border border-forest/20" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="subject" className="text-sm font-medium text-charcoal">
          Subject
        </Label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="h-11 rounded-[14px] border border-forest/20 bg-transparent px-3 text-sm text-charcoal"
        >
          <option value="" disabled>
            - Select -
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-sm font-medium text-charcoal">
          Your Message
        </Label>
        <Textarea id="message" name="message" required rows={6} className="rounded-[14px] border border-forest/20" />
      </div>
      <Button
        type="submit"
        disabled={status === "sending"}
        className="h-11 w-full rounded-[14px] border border-forest/20 bg-olive font-medium text-white hover:bg-forest sm:w-fit"
      >
        Submit Form
      </Button>
      {status === "ok" ? (
        <p className="font-sans text-sm text-charcoal">Thank you. Your message has been sent.</p>
      ) : null}
      {status === "err" ? <p className="font-sans text-sm text-charcoal">{error}</p> : null}
    </form>
  );
}
