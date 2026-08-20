const UA = "Mozilla/5.0";

function body(html) {
  let c = html
    .replace(/<head[\s\S]*?<\/head>/i, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<nav[\s\S]*?<\/nav>/gi, " ")
    .replace(/<header[\s\S]*?<\/header>/gi, " ");
  const f = c.search(/id=["']section-10-2939["']/i);
  if (f >= 0) c = c.slice(0, f);
  const p = c.search(/id=["']pum-/i);
  if (p >= 0) c = c.slice(0, p);
  return c
    .replace(/<[^>]+>/g, " ")
    .replace(/Visit our Facebook/gi, " ")
    .replace(/Visit our Instagram/gi, " ")
    .replace(/Schedule An Appointment/gi, " ")
    .replace(/https?:\/\/(?:www\.)?acuwellnessclinic\.com/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

for (const path of ["/packages-and-new-patient-portal/", "/schedule/"]) {
  const live = await (await fetch("https://acuwellnessclinic.com" + path, { headers: { "user-agent": UA } })).text();
  const local = await (await fetch("http://127.0.0.1:3000" + path, { headers: { "user-agent": UA } })).text();
  const lt = body(live);
  const loc = body(local);
  const windows = [];
  let acc = "";
  for (const w of lt.split(" ")) {
    acc = acc ? acc + " " + w : w;
    if (acc.length >= 48) {
      windows.push(acc);
      acc = "";
    }
  }
  const miss = windows.filter((w) => !loc.includes(w.slice(0, 40)));
  console.log(path, "live", lt.length, "local", loc.length, "miss", miss.length, miss[0] || "");
}
