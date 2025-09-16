import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// 🔑 forțează ruta să fie "dinamică", deci nu se generează în build
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const { error } = await supabase.from('profiles').select('*').limit(1)

  return NextResponse.json({ ok: !error, error: error?.message ?? null })
}
