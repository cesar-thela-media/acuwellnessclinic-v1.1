"use client";

import { useRef } from "react";
import { PageTitle, SiteContainer } from "@/components/site/page-primitives";
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
    .replace(/(src|href)=(['"])https?:\/\/acuwellnessclinic\.com\/wp-content\//gi, '$1=$2/media/wp-content/')
    .replace(/(src|href)=(['"])\/??wp-content\//gi, '$1=$2/media/wp-content/')
    .replace(/url\((['"]?)https?:\/\/acuwellnessclinic\.com\/wp-content\//gi, "url($1/media/wp-content/")
    .replace(/url\((['"]?)\/?wp-content\//gi, "url($1/media/wp-content/");
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

function articleTitle(title: string, html: string, path: string) {
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (heading) {
    return heading.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  }
  return displayTitle(title, path);
}

function articleHero(html: string) {
  const style = html.match(/<section\b[^>]*style=["']([^"']*background-image:[^"']*)["']/i)?.[1];
  if (!style) return null;
  const match = style.match(/url\(([^)]+)\)/i);
  if (!match) return null;
  return match[1].replace(/["']/g, "");
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
  const hero = !archive ? articleHero(html) : null;
  const showTitle = !hasHeading(html);
  const body = revealFeaturedImages(localizeMedia(html));
  const titleText = articleTitle(title, html, path);

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
      {archive ? (
        showTitle ? (
          <SiteContainer className="site-title-block site-container--wide">
            <PageTitle className="dump-line">{titleText}</PageTitle>
          </SiteContainer>
        ) : null
      ) : (
        <header className={cn("dump-article-header", hero && "dump-article-header--hero")}>
          {hero ? (
            <div
              className="dump-article-hero"
              style={{ backgroundImage: `linear-gradient(rgb(56 69 47 / 0.68), rgb(56 69 47 / 0.68)), url(${hero})` }}
              aria-hidden="true"
            />
          ) : null}
          <SiteContainer className="relative z-10 site-container--reading">
            <p className="dump-article-kicker dump-line">Si Shou Acupuncture and Wellness</p>
            <PageTitle className="dump-line">{titleText}</PageTitle>
          </SiteContainer>
        </header>
      )}
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
