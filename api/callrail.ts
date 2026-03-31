export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  if (req.query.key !== process.env.WEBHOOK_SECRET) {
    return res.status(401).send('Unauthorized');
  }

  const call = req.body || {};

  const firstCall = call.first_call === true;
  const answered = call.answered === true;
  const duration = Number(call.duration || 0);

  const baseLog = {
    received_at: new Date().toISOString(),
    first_call: call.first_call,
    answered: call.answered,
    duration: call.duration,
    customer_phone_number: call.customer_phone_number || null,
    source: call.source || null,
    gclid: call.gclid || null,
    msclkid: call.msclkid || null,
    person_id: call.person_id || null,
  };

  if (!firstCall) {
    console.log('IGNORED_NOT_FIRST_CALL', baseLog);
    return res.status(200).send('Ignored: not first call');
  }

  if (!answered) {
    console.log('IGNORED_NOT_ANSWERED', baseLog);
    return res.status(200).send('Ignored: not answered');
  }

  if (duration < 60) {
    console.log('IGNORED_DURATION_TOO_SHORT', baseLog);
    return res.status(200).send('Ignored: duration too short');
  }

  console.log('QUALIFIED_CALLRAIL_CONVERSION', baseLog);

  return res.status(200).send('Qualified');
}