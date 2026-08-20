const UA = "Mozilla/5.0";

function body(html) {
  let chunk = html
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ");
  const footerAt = chunk.search(/id=["']section-10-2939["']/i);
  if (footerAt !== -1) chunk = chunk.slice(0, footerAt);
  const pumAt = chunk.search(/id=["']pum-/i);
  if (pumAt !== -1) chunk = chunk.slice(0, pumAt);
  return chunk
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const path of ["/schedule/", "/packages-and-new-patient-portal/"]) {
  const r = await fetch(`https://acuwellnessclinic.com${path}`, { headers: { "user-agent": UA } });
  const html = await r.text();
  const t = body(html);
  console.log("\n==", path, r.status, "len", t.length);
  console.log(t);
}
