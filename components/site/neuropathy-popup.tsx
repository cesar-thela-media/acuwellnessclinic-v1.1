"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  NEWSLETTER_CLOSED_EVENT,
  NEWSLETTER_DISMISS_KEY,
} from "@/components/shadcn-space/blocks/dialog-block-01/dialog";
import { site } from "@/lib/site";

const NEUROPATHY_DISMISS_KEY = "ssaw-neuropathy-dismissed";

export function NeuropathyPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(NEUROPATHY_DISMISS_KEY)) return;

    const show = () => {
      if (sessionStorage.getItem(NEUROPATHY_DISMISS_KEY)) return;
      setOpen(true);
    };

    const onNewsletterClosed = () => {
      window.setTimeout(show, 700);
    };

    window.addEventListener(NEWSLETTER_CLOSED_EVENT, onNewsletterClosed);

    if (sessionStorage.getItem(NEWSLETTER_DISMISS_KEY)) {
      const t = window.setTimeout(show, 1800);
      return () => {
        window.clearTimeout(t);
        window.removeEventListener(NEWSLETTER_CLOSED_EVENT, onNewsletterClosed);
      };
    }

    return () => window.removeEventListener(NEWSLETTER_CLOSED_EVENT, onNewsletterClosed);
  }, []);

  function dismiss() {
    sessionStorage.setItem(NEUROPATHY_DISMISS_KEY, "1");
    setOpen(false);
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
        className="max-w-[calc(100%-2rem)] rounded-none border-charcoal/10 bg-white p-0 sm:max-w-3xl"
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:max-w-sm">
            <img
              src={site.media.neuropathy}
              alt=""
              width={300}
              height={185}
              className="h-40 w-full object-cover sm:h-full"
            />
          </div>
          <div className="flex w-full flex-col gap-6 p-6 md:p-10">
            <DialogHeader className="text-left">
              <DialogTitle className="font-heading text-xl font-semibold text-charcoal sm:text-2xl">
                Neuropathy Special
              </DialogTitle>
            </DialogHeader>
            <p className="font-sans text-sm leading-7 text-body">
              When you sign up for a full treatment plan for Peripheral Neuropathy, you will receive
              20 Tibetan foot soaks at no additional charge($300 value). These foot soaks help treat
              the neuropathy by improving the circulation in the small vessels of the feet. They
              definitely should be part of any treatment plan to improve a neuropathy. Enter code:
              PN2022 in the comments section when you sign up for an Initial Consultation and your
              foot soaks will be ready to go when you arrive. Also available if you book over the
              phone.{" "}
              <a
                href={site.booking.neuropathy}
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive underline"
              >
                Click here to book now.
              </a>
            </p>
            <Button
              type="button"
              onClick={dismiss}
              className="h-10 w-fit rounded-none bg-olive font-heading text-white hover:bg-olive/90"
            >
              CLOSE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
