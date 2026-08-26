"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { site } from "@/lib/site";

function videoEmbedUrl() {
  const base = site.media.youtubeHome.split("?")[0];
  const params = new URLSearchParams({
    autoplay: "0",
    mute: "1",
    controls: "0",
    rel: "0",
    playsinline: "1",
    modestbranding: "1",
    iv_load_policy: "3",
    enablejsapi: "1",
  });
  return `${base}?${params.toString()}`;
}

export default function AboutUs() {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [interacted, setInteracted] = useState(false);

  const post = useCallback((func: string) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  }, []);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const box = entry.boundingClientRect;
        const inView =
          entry.isIntersecting &&
          box.top < window.innerHeight * 0.6 &&
          box.bottom > window.innerHeight * 0.25;
        if (inView) post("playVideo");
        else post("pauseVideo");
      },
      { threshold: [0, 0.25, 0.5, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [post]);

  const toggle = () => {
    setInteracted(true);
    setPlaying((p) => {
      post(p ? "pauseVideo" : "playVideo");
      return !p;
    });
  };

  const toggleMute = () => {
    setInteracted(true);
    setMuted((m) => {
      post(m ? "unMute" : "mute");
      return !m;
    });
  };

  return (
    <section className="home-video-section w-full bg-white">
      <div className="site-container py-5 md:py-6">
        <h2 className="home-section-title text-center font-display text-3xl leading-[1.12] tracking-[-0.01em] text-forest sm:text-4xl !m-0">
          Welcome to Si Shou
        </h2>
      </div>
      <div
        ref={frameRef}
        className="home-video-frame group relative aspect-video w-full overflow-hidden bg-forest"
          onMouseEnter={() => {
            if (muted && !interacted) {
              post("unMute");
              setMuted(false);
            }
          }}
          onMouseLeave={() => {
            if (!muted) {
              post("mute");
              setMuted(true);
            }
          }}
        >
          <iframe
            ref={iframeRef}
            src={videoEmbedUrl()}
            title="Welcome to Si Shou"
            className="h-full w-full border-0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
          {!playing && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Play video"
              className="absolute inset-0 z-10 flex items-center justify-center bg-forest/40 transition-opacity hover:bg-forest/50"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-forest shadow-lg transition-transform group-hover:scale-105">
                <Play size={26} className="ml-0.5" aria-hidden="true" />
              </span>
            </button>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-4">
            <span className="rounded-full bg-charcoal/70 px-3 py-1.5 font-heading text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
              {muted
                ? "Muted. Hover to unmute"
                : "Playing with sound"}
            </span>
            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-charcoal/70 text-white backdrop-blur-sm transition-colors hover:bg-charcoal"
            >
              {muted ? (
                <VolumeX size={16} aria-hidden="true" />
              ) : (
                <Volume2 size={16} aria-hidden="true" />
              )}
            </button>
          </div>
      </div>
    </section>
  );
}