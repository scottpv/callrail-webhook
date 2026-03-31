module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const call = req.body || {};

  console.log('Incoming CallRail event:', call);

  return res.status(200).send('OK');
};