import { NextResponse } from "next/server";
import { Resend } from "resend";
import CalmTipEmail from "@/emails/CalmTipEmail";

export const runtime = "nodejs";

const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export async function POST(req: Request) {
  try {
    // Parse payload în siguranță
    const body = (await req.json().catch(() => ({}))) as any;

    // Normalizare email
    const email = (body.email ?? body.lead?.email ?? "")
      .toString()
      .trim()
      .toLowerCase();

    // Validări minime
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing payload: email" },
        { status: 400 }
      );
    }
    if (!EMAIL_RGX.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // ✅ Lazy-init RESEND – NU la top-level (evită crash la build pe Vercel)
    const key = process.env.RESEND_API_KEY;
    if (!key) {
      // Fără cheie în env (preview/local), nu trimitem email; nu blocăm build/run
      return NextResponse.json(
        { ok: true, note: "Email not sent (no RESEND_API_KEY in env)" },
        { status: 202 }
      );
    }

    const resend = new Resend(key);

    // Trimite email-ul (opțional; păstrează-ți propriul template/logică)
    // Ajustează "from" la un domeniu valid pentru contul tău Resend
    try {
      const { error } = await resend.emails.send({
        from: "Lumlyn <no-reply@lumlyn.dev>",
        to: [email],
        subject: "Welcome to Lumlyn",
        react: CalmTipEmail({ email }),
      });
      if (error) {
        console.error("[/api/leads] resend error", error);
        // Nu fail-uim request-ul userului pentru eroare de email – doar log
      }
    } catch (err) {
      console.error("[/api/leads] resend send() exception", err);
      // idem: nu aruncăm; răspundem 201/202 în funcție de caz
    }

    // TODO: aici poți salva lead-ul în DB / analytics (conform tracking.yaml)
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[/api/leads] server error", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/leads" });
}
