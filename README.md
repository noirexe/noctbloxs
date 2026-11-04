# NOCT PRISM · Asset Toolkit
Deploy ke Vercel: `vercel` (folder ini). `index.html` = UI, `api/roblox.js` = proxy Open Cloud milik sendiri (menggantikan corsproxy.io).
API Key: buat di Creator Dashboard dengan izin `asset:read` + `asset:write`, batasi ke IP/eksperience seperlunya.
Batas: body Vercel 4,5 MB (file > 4,4 MB ditolak di UI). Pakai MP3.

Uploader mendukung tipe **Animation** (.rbxm / .rbxmx emote & pose, content-type `model/x-rbxm`) lewat endpoint Open Cloud yang sama; izin API key tetap `asset:read` + `asset:write`.
