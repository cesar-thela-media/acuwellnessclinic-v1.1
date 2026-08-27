export const CAMPAIGN_HEROES: Record<string, string> = {
  "/what-is-cupping-therapy": "/media/wp-content/uploads/2017/04/mothers-day-acupuncture.jpg",
  "/what-is-tuina": "/media/wp-content/uploads/2018/07/AugBlog_img_1.jpg",
  "/what-is-guasha": "/media/wp-content/uploads/2017/03/pexels-photo-62279-crop.jpg",
  "/what-is-moxabustion": "/media/wp-content/uploads/2017/02/Blogimg-All-about-moxibustion_640.jpg",
  "/what-is-electro-acupuncture": "/media/wp-content/uploads/2018/02/BlogImg_1.jpg",
  "/chinese-herbal-medicine": "/media/wp-content/uploads/2016/09/Blog-img-Nutrition-for-Heart-Health-OM-Nutrition.jpg",
  "/what-is-nutritional-therapy": "/media/wp-content/uploads/2017/10/healthy-fruits-veggies.jpg",
  "/what-is-taichi-and-qigong": "/media/wp-content/uploads/2018/07/indian-summer-tcm.jpg",
  "/resources": "/media/wp-content/uploads/2018/06/JulyBlog_1.jpg",
  "/resources/facial-rejuvenation": "/media/wp-content/uploads/2017/04/Problem-areas.jpg",
  "/resources/more-research": "/media/wp-content/uploads/2017/09/Blogimg-Building-Up-Protective-Qi.jpg",
  "/resources/one-pagers": "/media/wp-content/uploads/2019/01/Blog1_image.jpg",
  "/resources/videos": "/media/wp-content/uploads/2017/12/Blogimg-ear.jpg",
  "/resources/smoking-cessation":
    "/media/wp-content/uploads/2017/03/Blog-img-Acupuncture-for-Addiction_640-bw.jpg",
  "/blog": "/media/wp-content/uploads/2016/09/Blog-img-7-Reasons-to-Seek-Out-Acupuncture-_640-1.jpg",
  "/schedule": "/media/wp-content/uploads/2018/02/BlogHead_2.jpg",
  "/cancellations-late-arrivals": "/media/wp-content/uploads/2017/01/time.jpg",
};

const FALLBACK_HEROES = [
  "/media/wp-content/uploads/2016/10/Blog-img-How-to-Prepare-For-Seasonal-Affective-Disorder_640.jpg",
  "/media/wp-content/uploads/2016/11/Blogimg-Foods-for-the-Winter-Season_640.jpg",
  "/media/wp-content/uploads/2018/06/blog_beach_family.jpg",
  "/media/wp-content/uploads/2017/01/Blog-Heart-A-Fire_640.jpg",
  "/media/wp-content/uploads/2017/03/hwn-spring17-3.jpg",
  "/media/wp-content/uploads/2017/03/hwn-spring17-4.jpg",
  "/media/wp-content/uploads/2017/05/Blogimg-Summer-Solstice.jpg",
  "/media/wp-content/uploads/2017/05/Blogimg-IBS-Traditional-Chinese-Medicine.jpg",
  "/media/wp-content/uploads/2017/09/Blogimg-Increase-White-Blood-Cell-Count.jpg",
  "/media/wp-content/uploads/2018/01/BlogImg2.jpg",
  "/media/wp-content/uploads/2018/03/aprBlog_img_1.jpg",
  "/media/wp-content/uploads/2018/03/aprBlogHead_1.jpg",
  "/media/wp-content/uploads/2018/08/sep_BlogHead_1-sm.jpg",
  "/media/wp-content/uploads/2018/11/Blog1_TCM-and-Seasonal-Affective-Disorder.jpg",
  "/media/wp-content/uploads/2018/12/Blog1_image.jpg",
  "/media/wp-content/uploads/2019/03/blog1_image.jpg",
  "/media/wp-content/uploads/2019/04/beating-the-blues.png",
  "/media/wp-content/uploads/2019/06/1499987287340-Summertime.jpg",
] as const;

function hashPath(path: string) {
  let hash = 0;
  for (const char of path) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return hash;
}

export function mediaKey(url: string) {
  return url
    .replace(/^.*\/uploads\//, "")
    .replace(/-\d+x\d+(?=\.[a-z0-9]+$)/i, "")
    .toLowerCase();
}

const RESERVED_HEROES = new Set([
  ...Object.values(CAMPAIGN_HEROES).map(mediaKey),
  ...FALLBACK_HEROES.map(mediaKey),
  "2017/01/chinese-herbs.jpg",
  "2011/07/color-meridians.jpg",
  "2017/04/acu_009.jpg",
  "2017/08/hands-2568594_1280.jpg",
  "2026/08/gannon-aomasept2022-r.jpeg",
  "2017/01/tai-chi-chuan.jpg",
  "2017/01/tuina.jpeg",
  "2017/01/guasha-tools.jpg",
  "2017/01/cupping-equip.jpg",
  "2017/01/moxibustion.jpg",
  "2017/01/fruits_veggies.jpg",
  "2011/08/parkinsons.png",
  "2011/08/pain.jpg",
  "2011/08/peripheral-neur2.jpeg",
  "2018/06/healthy-skin-acupuncture.jpg",
]);

export function campaignHero(path: string, html: string): string {
  const exact = CAMPAIGN_HEROES[path.replace(/\/page\/\d+$/, "")];
  if (exact) return exact;
  const fromHtml = articleHeroUrl(html);
  if (fromHtml && !RESERVED_HEROES.has(mediaKey(fromHtml))) return fromHtml;
  return FALLBACK_HEROES[hashPath(path) % FALLBACK_HEROES.length];
}

export function localizeHtml(html: string): string {
  return html
    .replace(/(src|href)=(['"])https?:\/\/acuwellnessclinic\.com\/wp-content\//gi, "$1=$2/media/wp-content/")
    .replace(/(src|href)=(['"])\/??wp-content\//gi, "$1=$2/media/wp-content/")
    .replace(/url\((['"]?)https?:\/\/acuwellnessclinic\.com\/wp-content\//gi, "url($1/media/wp-content/")
    .replace(/url\((['"]?)\/?wp-content\//gi, "url($1/media/wp-content/")
    .replace(/src=(['"])\/\/www\.youtube/gi, "src=$1https://www.youtube");
}

/** Keep all words; drop empty WP spacer nodes and a duplicate page H1. */
export function cleanStockHtml(html: string, pageTitle?: string): string {
  let out = html
    .replace(/<p[^>]*>\s*(?:&nbsp;|\u00a0|\s)*\s*<\/p>/gi, "")
    .replace(/<p[^>]*>\s*<br\s*\/?>\s*<\/p>/gi, "");

  if (pageTitle) {
    const normalized = pageTitle.replace(/\s+/g, " ").trim().toLowerCase();
    out = out.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i, (full, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()).toLowerCase();
      return text === normalized ? "" : full;
    });
  }

  return out.trim();
}

export function articleHeroUrl(html: string): string | null {
  const style = html.match(/<section\b[^>]*style=["']([^"']*background-image:[^"']*)["']/i)?.[1];
  if (!style) return null;
  const match = style.match(/url\(([^)]+)\)/i);
  if (!match) return null;
  return localizeHtml(match[1].replace(/["']/g, ""));
}

export function extractStockHtml(html: string): string {
  const marker = "oxy-stock-content-styles";
  const i = html.indexOf(marker);
  if (i === -1) {
    const opening = html.match(
      /^<div\b[^>]*(?:id|class)=['"][^'"]*(?:inner_content|ct-inner-content)[^'"]*['"][^>]*>/i,
    );
    if (!opening) return html;
    const start = opening[0].length;
    const end = html.lastIndexOf("</div>");
    return end > start ? html.slice(start, end) : html.slice(start);
  }
  const start = html.indexOf(">", i) + 1;
  if (start <= i) return "";
  let depth = 1;
  const re = /<span\b|<\/span>/g;
  re.lastIndex = start;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    if (m[0] === "</span>") {
      depth--;
      if (depth === 0) return html.slice(start, m.index);
    } else {
      depth++;
    }
  }
  return html.slice(start);
}

export function isArchivePath(path: string, html: string) {
  if (/^\/(category|tag)(\/|$)/.test(path)) return true;
  if (/^\/blog(\/|$)/.test(path)) return true;
  return /oxy-easy-posts|oxy-posts-grid/.test(html) && !/oxy-stock-content-styles/.test(html);
}

export function decodeEntities(text: string) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&#038;/g, "&");
}

export function displayTitle(title: string, html: string, path: string) {
  const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (heading) {
    return decodeEntities(heading.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
  }
  if (!title.startsWith("/")) return title;
  const parts = path.replace(/\/page\/\d+$/, "").split("/").filter(Boolean);
  const last = parts[parts.length - 1] || "Blog";
  if (last === "blog") return "Blog";
  return last
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
