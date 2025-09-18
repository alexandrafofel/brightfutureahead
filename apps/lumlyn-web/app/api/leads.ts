import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const sb = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } });

const POLICY_VERSION = process.env.NEXT_PUBLIC_POLICY_VERSION || "v1.0";
const POLICY_EFFECTIVE = process.env.NEXT_PUBLIC_POLICY_EFFECTIVE;
const POLICY = POLICY_EFFECTIVE ? `${POLICY_VERSION} (${POLICY_EFFECTIVE})` : POLICY_VERSION;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, quiz_answers, consent } = req.body ?? {};

    if (!email || typeof email !== "string") {
      return res.status(400).json({ error: "email required" });
    }
    if (!consent) {
      return res.status(400).json({ error: "GDPR consent required" });
    }

    const { data, error } = await sb
      .from("leads")
      .insert([
        {
          email,
          quiz_answers: quiz_answers ?? null,
          consent_marketing: true,
          consent_ts: new Date().toISOString(),
          policy_version: POLICY,
        },
      ])
      .select()
      .single();

    if (error) {
      const status = error.code === "23514" ? 400 : 500;
      return res.status(status).json({ error: error.message, code: error.code });
    }

    return res.status(200).json({ ok: true, lead_id: data.id, policy_version: data.policy_version });
  } catch (e: unknown) {
    const _err = e instanceof Error ? e : new Error(String(e));
return res.status(500).json({ error: _err.message || "internal_error" });}
}


