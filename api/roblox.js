// Vercel Serverless Function: /api/roblox?p=assets/v1/assets
// Meneruskan request ke Roblox Open Cloud (apis.roblox.com) agar browser tidak kena CORS
// TANPA memakai proxy pihak ketiga. API Key hanya lewat header dan tidak pernah disimpan/di-log.
export const config = { api: { bodyParser: false } };

const ALLOWED = [/^assets\/v1\/assets$/, /^assets\/v1\/operations\/[\w-]+$/];

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", c => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  const p = String(req.query.p || "");
  if (!ALLOWED.some(r => r.test(p))) return res.status(400).json({ error: "Path tidak diizinkan" });
  if (req.method !== "POST" && req.method !== "GET") return res.status(405).json({ error: "Method tidak diizinkan" });
  const key = req.headers["x-api-key"];
  if (!key) return res.status(401).json({ error: "API Key kosong" });

  try {
    const init = { method: req.method, headers: { "x-api-key": key } };
    if (req.method === "POST") {
      init.headers["content-type"] = req.headers["content-type"] || "application/octet-stream";
      init.body = await readBody(req);
    }
    const r = await fetch("https://apis.roblox.com/" + p, init);
    res.status(r.status);
    res.setHeader("content-type", r.headers.get("content-type") || "application/json");
    res.send(Buffer.from(await r.arrayBuffer()));
  } catch (e) {
    res.status(502).json({ error: "Gagal menghubungi Roblox: " + e.message });
  }
}
