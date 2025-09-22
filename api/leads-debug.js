// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  const key = process.env.APPS_SCRIPT_KEY || '';
  const preview = key ? `${key.slice(0,4)}…${key.slice(-4)}` : '';
  res.status(200).json({
    hasUrl: !!process.env.APPS_SCRIPT_URL,
    keyLen: key.length,
    keyPreview: preview
  });
};
