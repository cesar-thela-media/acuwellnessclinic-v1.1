import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-primitives";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const BOOK = site.booking.footer;

const providers = [
  {
    name: "Stefanie",
    image: "/media/wp-content/uploads/2021/02/Stef-and-Studen.jpg",
  },
  {
    name: "Becky",
    image: "/media/wp-content/uploads/2023/03/unnamed-150x150.jpg",
  },
] as const;

const Contact = () => {
  return (
    <div className="w-full bg-white">
      <PageHero
        title="Contact"
        image="/media/wp-content/uploads/2019/12/person-holding-someone-else-s-hand.jpg"
        imageClassName="object-top"
      />

      <section className="bg-cream">
        <div className="site-container site-section">
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg !m-0">
            If you prefer to send us a message, please complete the form below and we will get back to
            you within 24 hours.
          </p>
        </div>
      </section>

      {providers.map((provider, index) => (
        <section key={provider.name} className={index % 2 === 0 ? "bg-white" : "bg-cream"}>
          <article className="site-container site-section grid grid-cols-1 items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-16">
            <div
              className={cn(
                "overflow-hidden rounded-3xl bg-olive/10",
                index % 2 === 1 && "lg:order-2",
              )}
            >
              <img
                src={provider.image}
                alt={provider.name}
                className="aspect-[4/5] !h-full w-full object-cover object-center"
              />
            </div>
            <div
              className={cn(
                "flex min-w-0 flex-col items-start gap-5",
                index % 2 === 1 && "lg:order-1",
              )}
            >
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
            </div>
          </article>
        </section>
      ))}

      <section className="bg-white">
        <div className="site-container site-section grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="site-heading-2">Call or Visit</h2>
              <div className="flex flex-col gap-4 font-heading text-sm text-forest">
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center gap-2.5 font-display text-xl text-forest transition-colors hover:text-olive"
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
                    <span className="text-forest/75 text-right">{row.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h2 className="site-heading-2">Contact Form</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="site-container site-section">
          <p className="max-w-3xl text-sm leading-relaxed text-body !m-0">
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
