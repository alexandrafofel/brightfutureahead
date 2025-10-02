import { NextResponse } from "next/server";

export async function POST(req: Request) {
try {
const body = await req.json().catch(() => ({}));
if (!body?.email && !body?.lead) {
return NextResponse.json({ ok: false, error: "Missing payload" }, { status: 400 });
}
return NextResponse.json({ ok: true }, { status: 201 });
} catch (e) {
return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
}
}
