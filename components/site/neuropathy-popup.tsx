"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function NeuropathyPopup() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <dialog open>
      <h2>Neuropathy Special</h2>
      <p>
        When you sign up for a full treatment plan for Peripheral Neuropathy, you will receive 20
        Tibetan foot soaks at no additional charge($300 value). These foot soaks help treat the
        neuropathy by improving the circulation in the small vessels of the feet. They definitely
        should be part of any treatment plan to improve a neuropathy. Enter code: PN2022 in the
        comments section when you sign up for an Initial Consultation and your foot soaks will be
        ready to go when you arrive. Also available if you book over the phone.{" "}
        <a href={site.booking.neuropathy} target="_blank" rel="noopener noreferrer">
          Click here to book now.
        </a>
      </p>
      <p>
        <img src={site.media.neuropathy} alt="" width={300} height={185} />
      </p>
      <p>
        <button type="button" onClick={() => setOpen(false)}>
          CLOSE
        </button>
      </p>
    </dialog>
  );
}
