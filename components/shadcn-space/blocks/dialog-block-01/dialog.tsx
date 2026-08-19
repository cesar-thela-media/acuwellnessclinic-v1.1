"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const NEWSLETTER_DISMISS_KEY = "ssaw-newsletter-dismissed";
export const NEWSLETTER_CLOSED_EVENT = "ssaw-newsletter-closed";

const DialogBlock = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  useEffect(() => {
    if (sessionStorage.getItem(NEWSLETTER_DISMISS_KEY)) return;
    const t = window.setTimeout(() => setOpen(true), 1800);
    return () => window.clearTimeout(t);
  }, []);

  function dismiss() {
    sessionStorage.setItem(NEWSLETTER_DISMISS_KEY, "1");
    setOpen(false);
    window.dispatchEvent(new Event(NEWSLETTER_CLOSED_EVENT));
  }

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
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="max-w-lg rounded-none border-charcoal/10 bg-white p-8 sm:max-w-lg"
      >
        <DialogHeader className="text-left">
          <DialogTitle className="font-heading text-xl font-semibold text-charcoal sm:text-2xl">
            Would You Like to Receive Our Newsletter?
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="FNAME" className="font-sans text-sm text-charcoal">
              First Name
            </Label>
            <Input id="FNAME" name="FNAME" required className="h-10 rounded-none" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="LNAME" className="font-sans text-sm text-charcoal">
              Last Name
            </Label>
            <Input id="LNAME" name="LNAME" className="h-10 rounded-none" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="EMAIL" className="font-sans text-sm text-charcoal">
              Email address:
            </Label>
            <Input
              id="EMAIL"
              name="EMAIL"
              type="email"
              placeholder="Your email address"
              required
              className="h-10 rounded-none"
            />
          </div>
          <Button
            type="submit"
            disabled={status === "sending"}
            className="h-10 rounded-none bg-olive font-heading text-white hover:bg-olive/90"
          >
            Subscribe
          </Button>
          {status === "ok" ? (
            <p className="font-sans text-sm text-charcoal">Thank you for subscribing.</p>
          ) : null}
          {status === "err" ? (
            <p className="font-sans text-sm text-charcoal">
              Subscription is temporarily unavailable.
            </p>
          ) : null}
        </form>
        <Button
          type="button"
          variant="outline"
          onClick={dismiss}
          className="h-10 rounded-none border-charcoal/20 font-heading text-charcoal"
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBlock;
