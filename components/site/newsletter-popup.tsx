"use client";

import { useState } from "react";

export function NewsletterPopup() {
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  if (!open) return null;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      firstName: String(form.get("FNAME") || ""),
      lastName: String(form.get("LNAME") || ""),
      email: String(form.get("EMAIL") || ""),
    };
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "newsletter", payload }),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("ok");
    } catch {
      setStatus("err");
    }
  }

  return (
    <dialog open>
      <h2>Would You Like to Receive Our Newsletter?</h2>
      <form onSubmit={onSubmit}>
        <p>
          <label htmlFor="FNAME">First Name</label>
          <br />
          <input id="FNAME" name="FNAME" required />
        </p>
        <p>
          <label htmlFor="LNAME">Last Name</label>
          <br />
          <input id="LNAME" name="LNAME" />
        </p>
        <p>
          <label htmlFor="EMAIL">Email address:</label>
          <br />
          <input id="EMAIL" name="EMAIL" type="email" placeholder="Your email address" required />
        </p>
        <p>
          <button type="submit" disabled={status === "sending"}>
            Subscribe
          </button>
        </p>
        {status === "ok" ? <p>Thank you for subscribing.</p> : null}
        {status === "err" ? <p>Subscription is temporarily unavailable.</p> : null}
      </form>
      <p>
        <button type="button" onClick={() => setOpen(false)}>
          Close
        </button>
      </p>
    </dialog>
  );
}
