// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });

    const url = process.env.APPS_SCRIPT_URL;
    if (!url) return res.status(500).json({ ok:false, error:'Missing APPS_SCRIPT_URL env var' });

    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const body = new URLSearchParams();
    Object.entries(payload).forEach(([k, v]) => body.append(k, String(v ?? '')));

    const r = await fetch(url, { method: 'POST', body });
    const ct = r.headers.get('content-type') || '';
    const raw = await (ct.includes('application/json') ? r.json() : r.text());
    if (!r.ok) return res.status(502).json({ ok:false, error:`Apps Script responded ${r.status}`, detail: raw });

    res.status(200).json(typeof raw === 'string' ? { ok:true, raw } : raw);
  } catch (e) {
    res.status(500).json({ ok:false, error: e?.message || 'Function failed' });
  }
};
