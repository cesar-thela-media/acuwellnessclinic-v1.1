import { Clock, MapPin, Phone } from "lucide-react";
import { PageTitle } from "@/components/site/page-primitives";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

const BOOK = site.booking.footer;

const providers = [
  {
    name: "Kate",
    image: "/media/wp-content/uploads/2026/08/Gannon-AOMASept2022-R-150x150.jpeg",
  },
  {
    name: "Aaron",
    image: "/media/wp-content/uploads/2023/03/unnamed-150x150.jpg",
  },
] as const;

const Contact = () => {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-10 md:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <PageTitle>Contact</PageTitle>
            <p className="text-base leading-relaxed text-body md:text-lg !m-0">
              If you prefer to send us a message, please complete the form below and we will get back to
              you within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {providers.map((provider) => (
              <article
                key={provider.name}
                className="site-card flex flex-col items-center gap-5 p-6 text-center sm:p-8"
              >
                <div className="site-media h-36 w-36 overflow-hidden rounded-full sm:h-40 sm:w-40">
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="!h-full w-full object-cover object-center"
                  />
                </div>
                <h2 className="font-heading text-xl font-semibold tracking-tight text-forest sm:text-2xl !m-0">
                  {provider.name}
                </h2>
                <a
                  href={BOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="site-button site-button--primary"
                >
                  Schedule Appointment With {provider.name}
                </a>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <div className="site-card flex flex-col gap-10 p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <h2 className="site-heading-2">Call or Visit</h2>
                <div className="flex flex-col gap-4 font-heading text-sm text-forest">
                  <a
                    href={`tel:${site.phoneTel}`}
                    className="inline-flex items-center gap-2.5 font-heading text-xl font-semibold text-forest transition-colors hover:text-olive"
                  >
                    <Phone size={18} className="shrink-0" aria-hidden="true" />
                    {site.phoneDisplay}
                  </a>
                  <p className="flex items-start gap-2.5 !m-0">
                    <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span>
                      {site.address.street}
                      <br />
                      {site.address.city}, {site.address.region} {site.address.postal}
                    </span>
                  </p>
                  <a
                    href="/contact/map-directions"
                    className="site-link inline-flex items-center gap-1.5 font-medium"
                  >
                    Map & Directions
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="site-heading-2 flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" />
                  Hours
                </h2>
                <ul className="flex flex-col gap-1.5 font-heading text-sm leading-relaxed text-forest/85 !m-0 !list-none !p-0">
                  {site.hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-baseline justify-between border-b border-forest/10 pb-1 last:border-0"
                    >
                      <span className="w-10 shrink-0 font-semibold text-forest/90">{row.day}:</span>
                      <span className="text-right text-forest/75">{row.hours}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="site-card p-6 md:p-8">
              <h2 className="site-heading-2">Contact Form</h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-body !m-0">
            Disclaimer: Please refrain from submitting any individually identifiable health
            information through this form. Any health information submitted through this form is the
            sole responsibility of that person. No liability will fall on the website owner or its
            supplier. For more information about HIPAA please visit{" "}
            <a
              href="http://www.hhs.gov/ocr/privacy/"
              className="font-medium text-olive underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.hhs.gov/ocr/privacy/
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
