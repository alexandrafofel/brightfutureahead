// apps/lumlyn-web/app/api/leads/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs'; // Resend folosește Node runtime, nu Edge

type LeadPayload = {
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  message?: string;
  utm?: Record<string, string>;
};

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  try {
    return new Resend(key);
  } catch {
    return null;
  }
}

function isValidEmail(email: unknown): email is string {
  return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let payload: LeadPayload;

  // 1) Parse body
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  // 2) Validate minimal fields
  if (!isValidEmail(payload.email)) {
    return NextResponse.json({ ok: false, error: 'Valid email is required' }, { status: 422 });
  }

  // 3) (Optional) Persist lead în DB/analytics aici, dacă aveți integrare
  // TODO: save lead

  // 4) Email notification (safe + optional)
  const resend = getResend();
  if (!resend) {
    // Fără cheie în dev/CI → nu blocăm build-ul/răspunsul
    return NextResponse.json(
      { ok: true, emailSent: false, reason: 'RESEND_API_KEY missing — skipped email send' },
      { status: 202 }
    );
  }

  const to = process.env.LEADS_NOTIFY_TO; // cui notificăm
  const from = process.env.LEADS_FROM_EMAIL ?? 'Lumlyn <no-reply@lumlyn.com>';

  if (!to) {
    // Lipsă destinație: nu e critic; răspundem 202 ca „acceptat”
    return NextResponse.json(
      { ok: true, emailSent: false, reason: 'LEADS_NOTIFY_TO missing — skipped email send' },
      { status: 202 }
    );
  }

  try {
    await resend.emails.send({
      from,
      to,
      subject: `New lead: ${payload.email}`,
      html: `
        <h2>New lead captured</h2>
        <p><b>Email:</b> ${payload.email}</p>
        ${payload.name ? `<p><b>Name:</b> ${payload.name}</p>` : ''}
        ${payload.firstName || payload.lastName ? `<p><b>First/Last:</b> ${payload.firstName ?? ''} ${payload.lastName ?? ''}</p>` : ''}
        ${payload.source ? `<p><b>Source:</b> ${payload.source}</p>` : ''}
        ${payload.message ? `<p><b>Message:</b> ${payload.message}</p>` : ''}
        ${payload.utm ? `<pre>${JSON.stringify(payload.utm, null, 2)}</pre>` : ''}
      `,
    });

    return NextResponse.json({ ok: true, emailSent: true }, { status: 200 });
  } catch (err: any) {
    // Nu dăm fail la request-ul UI dacă emailul eșuează
    return NextResponse.json(
      { ok: true, emailSent: false, reason: 'Resend send error', detail: String(err?.message ?? err) },
      { status: 202 }
    );
  }
}
