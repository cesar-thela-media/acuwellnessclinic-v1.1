import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("site-container", className)}>{children}</div>;
}

export function PageTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h1 className={cn("site-title", className)}>{children}</h1>;
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h2 className={cn("site-heading-2", className)}>{children}</h2>;
}

export function PageHero({
  title,
  image = site.media.hero,
  imageClassName,
  children,
}: {
  title: React.ReactNode;
  image?: string;
  imageClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest">
      <img
        src={image}
        alt=""
        className={cn(
          "absolute inset-0 !h-full w-full object-cover object-center",
          imageClassName,
        )}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/72 to-forest/50"
      />
      <div className="site-container relative flex min-h-[22rem] flex-col justify-end gap-6 py-14 md:min-h-[26rem] md:py-16">
        <PageTitle className="!text-white">{title}</PageTitle>
        {children}
      </div>
    </section>
  );
}
