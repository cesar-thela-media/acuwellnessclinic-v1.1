import { site } from "@/lib/site";

export default function AboutUs() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 md:py-24 lg:px-16 lg:py-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="font-display text-lg italic text-olive !m-0">01</p>
          <h2 className="mt-2 font-display text-3xl leading-[1.12] tracking-[-0.01em] text-forest sm:text-4xl !m-0">
            Welcome to Si Shou
          </h2>
        </div>
        <div
          className="relative overflow-hidden rounded-3xl bg-forest shadow-[0_24px_60px_-24px_rgba(44,58,40,0.4)] [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
          dangerouslySetInnerHTML={{
            __html: `<div class="aspect-video w-full"><iframe src="${site.media.youtubeHome}" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>`,
          }}
        />
      </div>
    </section>
  );
}
