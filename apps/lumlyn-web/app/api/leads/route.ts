import { NextResponse } from "next/server";
import { Resend } from "resend";
import CalmTipEmail from "@/emails/CalmTipEmail";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RGX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as any;

    const email = (body.email ?? body.lead?.email ?? "").toString().trim().toLowerCase();
    if (!email) return NextResponse.json({ ok: false, error: "Missing payload: email" }, { status: 400 });
    if (!EMAIL_RGX.test(email)) return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });

    const tip_id = body.tip_id ?? body.lead?.tip_id ?? "unknown_tip";
    const user_type = body.user_type ?? body.lead?.user_type ?? "clarity";
    const topic = body.topic ?? body.lead?.topic ?? "sleep";
    const age_band = body.age_band ?? body.lead?.age_band ?? "2-3";
    const strategy = body.strategy ?? body.lead?.strategy ?? "unknown";
    const source = body.source ?? body.lead?.source ?? "quiz_tips";
    const tip_text = body.tip_text ?? body.lead?.tip_text ?? "A gentle step is on the way.";

    const from = process.env.EMAIL_FROM || "Lumlyn <no-reply@lumlyn.com>";
    const subject = "Your calm tip from Lumlyn";

    if (!process.env.RESEND_API_KEY) {
      console.warn("[/api/leads] RESEND_API_KEY missing — skipping send()");
    } else {
      const { error } = await resend.emails.send({
        from,
        to: email,
        subject,
        react: CalmTipEmail({
          tipText: tip_text,
          topic: String(topic),
          ageBand: String(age_band),
          userType: String(user_type),
        }),
      });
      if (error) console.error("[/api/leads] resend error", error);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    console.error("[/api/leads] server error", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/leads" });
}
