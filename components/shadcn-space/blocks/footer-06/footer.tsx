import Link from "next/link";
import { Phone, MapPin, Calendar, Clock, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="site-footer w-full overflow-x-clip bg-olive text-forest">
      <div className="site-container site-footer-inner py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Brand & Direct Contact */}
          <div className="flex min-w-0 flex-col gap-5">
            <Link href="/" className="w-fit shrink-0 block" aria-label={site.name}>
              <img
                src={site.media.logo}
                alt={site.name}
                width={300}
                height={300}
                className="site-footer-logo block h-14 w-auto max-w-[13rem] object-contain"
              />
            </Link>
            <p className="font-heading text-xs uppercase tracking-[0.16em] text-forest/65 !m-0">
              {site.tagline}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center gap-2.5 font-display text-xl text-forest hover:text-forest transition-colors"
              >
                <Phone size={18} className="text-forest shrink-0" aria-hidden="true" />
                <span>{site.phoneDisplay}</span>
              </a>
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on Facebook (opens in a new tab)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest/85 transition-colors hover:bg-olive hover:text-forest"
              >
                <FacebookIcon />
              </a>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit us on Instagram (opens in a new tab)"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest/10 text-forest/85 transition-colors hover:bg-olive hover:text-forest"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2: Booking */}
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-forest/15 pb-2">
              <Calendar size={15} className="text-forest shrink-0" aria-hidden="true" />
              <h3 className="font-heading text-xs font-semibold tracking-[0.16em] text-forest uppercase !m-0">
                Booking
              </h3>
            </div>
            <div className="flex flex-col gap-2.5">
              <a
                href={site.booking.footer}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-link inline-flex items-center justify-between rounded-xl border border-forest/15 bg-forest/5 px-3.5 py-2.5 font-heading text-sm font-medium text-forest/90 hover:border-olive hover:bg-olive hover:text-forest transition-all duration-200"
              >
                <span>Schedule with Kate</span>
                <ExternalLink size={14} className="opacity-60" />
              </a>
              <a
                href={site.booking.footer}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer-link inline-flex items-center justify-between rounded-xl border border-forest/15 bg-forest/5 px-3.5 py-2.5 font-heading text-sm font-medium text-forest/90 hover:border-olive hover:bg-olive hover:text-forest transition-all duration-200"
              >
                <span>Schedule with Aaron</span>
                <ExternalLink size={14} className="opacity-60" />
              </a>
            </div>
          </div>

          {/* Column 3: Hours */}
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-forest/15 pb-2">
              <Clock size={15} className="text-forest shrink-0" aria-hidden="true" />
              <h3 className="font-heading text-xs font-semibold tracking-[0.16em] text-forest uppercase !m-0">
                Hours
              </h3>
            </div>
            <ul className="flex flex-col gap-1.5 font-heading text-sm leading-relaxed text-forest/85 !m-0 !list-none !p-0">
              {site.hours.map((row) => (
                <li key={row.day} className="flex items-baseline justify-between border-b border-forest/10 pb-1 last:border-0">
                  <span className="w-10 shrink-0 font-semibold text-forest/90">{row.day}:</span>
                  <span className="text-forest/75 text-right">{row.hours}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Visit & Location */}
          <div className="flex min-w-0 flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-forest/15 pb-2">
              <MapPin size={15} className="text-forest shrink-0" aria-hidden="true" />
              <h3 className="font-heading text-xs font-semibold tracking-[0.16em] text-forest uppercase !m-0">
                Visit
              </h3>
            </div>
            <div className="flex flex-col gap-1 font-heading text-sm leading-relaxed text-forest/85">
              <p className="!m-0 font-semibold text-forest">{site.address.line1}</p>
              <p className="!m-0 text-forest/80">{site.address.line2}</p>
              <p className="!m-0 text-forest/80">{site.address.line3}</p>
            </div>
            <div className="pt-2">
              <Link
                href="/contact/map-directions"
                className="inline-flex items-center gap-1.5 text-xs font-heading font-medium text-forest hover:text-forest transition-colors"
              >
                <span>Map &amp; Directions</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-forest/15 pt-6 sm:flex-row">
          <p className="font-heading text-xs tracking-wide text-forest/65 !m-0 text-center sm:text-left">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-forest/65 font-heading">
            <a
              href={site.media.privacyPdf}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-forest transition-colors"
            >
              Privacy Policy
            </a>
            <Link href="/clinic-forms" className="hover:text-forest transition-colors">
              Clinic Forms
            </Link>
            <Link href="/contact" className="hover:text-forest transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
