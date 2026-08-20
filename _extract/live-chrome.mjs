const UA = "Mozilla/5.0";

async function grab(url) {
  const r = await fetch(url, { headers: { "user-agent": UA } });
  const html = await r.text();
  const noHead = html.replace(/<head[\s\S]*?<\/head>/i, " ");
  const i = noHead.search(/>Topics</i);
  const i2 = i < 0 ? noHead.search(/Topics/i) : i;
  const slice =
    i2 >= 0
      ? noHead
          .slice(Math.max(0, i2 - 120), i2 + 500)
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
      : "";
  const heroMatch = noHead.match(
    /DO THE THINGS[\s\S]{0,250}ACUPUNCTURE IN SOUTH|ACUPUNCTURE IN SOUTH[\s\S]{0,250}DO THE THINGS/i,
  );
  const formDemo = /Contact Form Demo/i.test(html);
  const modality = /<strong>Modality<\/strong>/i.test(html) || />Modality</i.test(html);
  console.log("\n==", url, r.status);
  console.log("formDemo", formDemo, "modalityHeader", modality);
  if (slice) console.log("topics", slice.slice(0, 320));
  if (heroMatch)
    console.log("hero", heroMatch[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 200));
}

await grab("https://acuwellnessclinic.com/does-acupuncture-hurt/");
await grab("https://acuwellnessclinic.com/");
await grab("https://acuwellnessclinic.com/treatment-modalities/");
await grab("https://acuwellnessclinic.com/contact/");
await grab("https://acuwellnessclinic.com/about-us/");
