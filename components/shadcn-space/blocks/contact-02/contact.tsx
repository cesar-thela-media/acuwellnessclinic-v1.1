import { PageTitle } from "@/components/site/page-primitives";
import { ContactForm } from "@/components/site/contact-form";
import { site } from "@/lib/site";

const BOOK = site.booking.footer;

const Contact = () => {
  return (
    <div className="w-full bg-white">
      <div className="site-container site-section flex flex-col gap-12 md:gap-16">
        <PageTitle>Contact</PageTitle>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="flex flex-col items-start gap-4">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/media/wp-content/uploads/2026/08/Gannon-AOMASept2022-R-150x150.jpeg"
                alt=""
                width={150}
                height={150}
                className="h-36 w-36 object-cover"
              />
            </div>
            <a
              href={BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button site-button--primary"
            >
              Schedule Appointment With Stefanie
            </a>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/media/wp-content/uploads/2023/03/unnamed-150x150.jpg"
                alt=""
                width={150}
                height={150}
                className="h-36 w-36 object-cover"
              />
            </div>
            <a
              href={BOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button site-button--primary"
            >
              Schedule Appointment With Becky
            </a>
          </div>
        </div>

        <p className="site-body-copy text-body !m-0">
          If you prefer to send us a message, please complete the form below and we will get back to
          you within 24 hours.
        </p>

        <div className="site-card max-w-2xl p-6 md:p-8">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-charcoal !m-0">Contact Form</h2>
          <ContactForm />
        </div>

        <p className="site-body-copy text-sm leading-relaxed text-body !m-0">
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
    </div>
  );
};

export default Contact;
