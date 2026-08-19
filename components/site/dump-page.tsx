"use client";

import { useRef } from "react";
import { WpBody } from "@/components/site/wp-body";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

function hasHeading(html: string) {
  return /<h1\b/i.test(html);
}

function isArchive(path: string, html: string) {
  if (/^\/(category|tag)(\/|$)/.test(path)) return true;
  if (/^\/blog(\/|$)/.test(path)) return true;
  return /oxy-easy-posts|oxy-posts-grid/.test(html) && !/<h1\b/i.test(html);
}

function localizeMedia(html: string) {
  return html
    .replace(/(src|href)="wp-content\//gi, '$1="/media/wp-content/')
    .replace(/(src|href)="\/wp-content\//gi, '$1="/media/wp-content/')
    .replace(/url\(wp-content\//gi, "url(/media/wp-content/")
    .replace(/url\(\/wp-content\//gi, "url(/media/wp-content/");
}

function revealFeaturedImages(html: string) {
  return html.replace(/style="([^"]*background-image:[^"]*)"/gi, (_full, style: string) => {
    const match = style.match(/url\(([^)]+)\)/i);
    if (!match) return `style="${style}"`;
    const url = match[1].replace(/['"]/g, "");
    if (!url) return `style="${style}"`;
    return `style="background-image:url(${url})"`;
  });
}

function displayTitle(title: string, path: string) {
  if (!title.startsWith("/")) return title;
  const parts = path.replace(/\/page\/\d+$/, "").split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "Blog";
  if (last === "blog") return "Blog";
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function DumpPage({
  title,
  html,
  path = "",
}: {
  title: string;
  html: string;
  path?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const archive = isArchive(path, html);
  const showTitle = !hasHeading(html);
  const body = revealFeaturedImages(localizeMedia(html));

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".dump-line", {
        autoAlpha: 0,
        y: 16,
        duration: 1.25,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      {showTitle ? (
        <div
          className={cn(
            "mx-auto w-full px-6 pt-20 sm:px-10 sm:pt-28",
            archive ? "max-w-6xl lg:px-12" : "max-w-3xl lg:px-0",
          )}
        >
          <h1 className="dump-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
            {displayTitle(title, path)}
          </h1>
        </div>
      ) : null}
      <div
        className={cn(
          "dump-line prose-wp",
          archive ? "prose-wp-archive" : "prose-wp-read",
        )}
      >
        <WpBody html={body} />
      </div>
    </div>
  );
}
