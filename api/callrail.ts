export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (req.query.key !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send('Unauthorized');
  }

  const call = req.body || {};

  console.log('Incoming CallRail event:', call);

  return res.status(200).send('OK');
}
