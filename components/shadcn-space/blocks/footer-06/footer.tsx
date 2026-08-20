import { site } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="w-full overflow-x-clip bg-forest text-white">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-6 py-16 sm:px-10 md:py-20 lg:px-16">
        <div className="flex min-w-0 flex-col gap-14">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex max-w-sm flex-col gap-4">
              <a href="/" className="w-fit">
                <span className="inline-flex items-center rounded-xl bg-white px-3 py-2">
                  <img
                    src={site.media.logo}
                    alt={site.name}
                    width={439}
                    height={512}
                    className="h-6 w-auto object-contain"
                  />
                </span>
              </a>
              <a
                href={`tel:${site.phoneTel}`}
                className="font-display text-xl text-olive transition-colors hover:text-white !m-0"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-16">
            <div className="flex flex-col gap-5">
              <p className="font-heading text-xs font-semibold tracking-[0.16em] text-olive !m-0">Booking</p>
              <a
                href={site.booking.footer}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                Schedule Appointment with Kate
              </a>
              <a
                href={site.booking.footer}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                Schedule Appointment with Aaron
              </a>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-heading text-xs font-semibold tracking-[0.16em] text-olive !m-0">Hours</p>
              <ul className="flex flex-col gap-2.5 font-heading text-sm leading-relaxed text-white/85 !m-0 !list-none !p-0">
                {site.hours.map((row) => (
                  <li key={row.day} className="flex items-baseline gap-3">
                    <span className="w-9 shrink-0 font-semibold text-white">{row.day}</span>
                    <span>{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-5">
              <p className="font-heading text-xs font-semibold tracking-[0.16em] text-olive !m-0">Visit</p>
              <div className="flex flex-col gap-1.5 font-heading text-sm leading-relaxed text-white/85">
                <p className="!m-0 font-semibold text-white">{site.address.line1}</p>
                <p className="!m-0">{site.address.line2}</p>
                <p className="!m-0">{site.address.line3}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 pt-8">
            <p className="font-heading text-xs tracking-wide text-white/60 !m-0">{site.name}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
