"use client";

import { useState } from "react";

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
    const form = new FormData(e.currentTarget);
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
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setError("Submission is temporarily unavailable.");
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <p>
        <label htmlFor="firstName">First Name</label>
        <br />
        <input id="firstName" name="firstName" required />
      </p>
      <p>
        <label htmlFor="lastName">Last Name</label>
        <br />
        <input id="lastName" name="lastName" required />
      </p>
      <p>
        <label htmlFor="email">Email</label>
        <br />
        <input id="email" name="email" type="email" required />
      </p>
      <p>
        <label htmlFor="phone">Phone/Mobile</label>
        <br />
        <input id="phone" name="phone" type="tel" required />
      </p>
      <p>
        <label htmlFor="subject">Subject</label>
        <br />
        <select id="subject" name="subject" required defaultValue="">
          <option value="" disabled>
            - Select -
          </option>
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </p>
      <p>
        <label htmlFor="message">Your Message</label>
        <br />
        <textarea id="message" name="message" required rows={6} />
      </p>
      <p>
        <button type="submit" disabled={status === "sending"}>
          Submit Form
        </button>
      </p>
      {status === "ok" ? <p>Thank you. Your message has been sent.</p> : null}
      {status === "err" ? <p>{error}</p> : null}
    </form>
  );
}
