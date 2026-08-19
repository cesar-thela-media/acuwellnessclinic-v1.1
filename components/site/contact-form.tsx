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
    <form onSubmit={onSubmit} method="post" className="flex max-w-xl flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="firstName" className="font-sans text-sm text-charcoal">
          First Name
        </Label>
        <Input id="firstName" name="firstName" required className="h-10 rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="lastName" className="font-sans text-sm text-charcoal">
          Last Name
        </Label>
        <Input id="lastName" name="lastName" required className="h-10 rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-sans text-sm text-charcoal">
          Email
        </Label>
        <Input id="email" name="email" type="email" required className="h-10 rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="font-sans text-sm text-charcoal">
          Phone/Mobile
        </Label>
        <Input id="phone" name="phone" type="tel" required className="h-10 rounded-none" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="subject" className="font-sans text-sm text-charcoal">
          Subject
        </Label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="h-10 rounded-none border border-input bg-transparent px-3 font-sans text-sm text-charcoal"
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
        <Label htmlFor="message" className="font-sans text-sm text-charcoal">
          Your Message
        </Label>
        <Textarea id="message" name="message" required rows={6} className="rounded-none" />
      </div>
      <Button
        type="submit"
        disabled={status === "sending"}
        className="h-10 w-fit rounded-none bg-olive font-heading text-white hover:bg-olive/90"
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
