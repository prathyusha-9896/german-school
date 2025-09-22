// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const page = String(req.query.page || '1');
    const pageSize = String(req.query.pageSize || '25');
    const url = `${process.env.APPS_SCRIPT_URL}?key=${encodeURIComponent(process.env.APPS_SCRIPT_KEY || '')}&page=${page}&pageSize=${pageSize}`;

    const r = await fetch(url);
    const data = await r.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ ok:false, error: e?.message || 'Proxy error' });
  }
};
