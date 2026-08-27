import { site } from "@/lib/site";

function videoEmbedUrl() {
  const base = site.media.youtubeHome.split("?")[0];
  return `${base}?rel=0`;
}

export default function AboutUs() {
  return (
    <section className="home-video-section w-full bg-cream">
      <div className="site-container py-5 md:py-6">
        <h2 className="home-section-title text-center font-display text-3xl leading-[1.12] tracking-[-0.01em] text-forest sm:text-4xl !m-0">
          Welcome to Si Shou
        </h2>
      </div>
      <div className="w-full px-4 pb-5 sm:px-6 md:px-8 md:pb-6">
        <div className="home-video-frame relative aspect-video w-full overflow-hidden bg-forest">
          <iframe
            src={videoEmbedUrl()}
            title="Welcome to Si Shou"
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
