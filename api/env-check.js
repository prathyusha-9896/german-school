// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res) => {
  res.status(200).json({
    ok: true,
    hasUrl: Boolean(process.env.APPS_SCRIPT_URL),
    hasKey: Boolean(process.env.APPS_SCRIPT_KEY),
  });
};
