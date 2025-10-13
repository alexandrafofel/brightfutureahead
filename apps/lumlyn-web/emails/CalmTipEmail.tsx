import * as React from "react";
import { Logo } from "@/components/Logo/Logo";

export function CalmTipEmail({
  tipText,
  tipId,
  topic,
  ageBand,
  userType,
}: {
  tipText: string;
  tipId: string;
  topic: string;
  ageBand: string;
  userType: string;
}) {
  return (
    <div style={{ fontFamily: "Nunito Sans, Arial, sans-serif", color: "#1A1A1A" }}>
        <Logo/>
      <h1 style={{ fontSize: 20, lineHeight: "28px", margin: 0, fontWeight: 700 }}>
        Your calm tip from Lumlyn
      </h1>
      <p style={{ fontSize: 14, lineHeight: "22px", margin: "12px 0 0" }}>
        Here’s a short, validated step you can try today:
      </p>
      <div
        style={{
          marginTop: 12,
          padding: "14px 16px",
          borderRadius: 12,
          background:
            "linear-gradient(90deg, rgba(158, 140, 246, 0.10) 0%, rgba(201, 189, 249, 0.10) 100%)",
          border: "1px solid #E7E2FB",
        }}
      >
        {String(tipText || "")
          .trim()
          .split(/\n{2,}/)
          .map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? 0 : "10px 0 0", fontSize: 16, lineHeight: "24px" }}>
              {p}
            </p>
          ))}
      </div>

      <p style={{ fontSize: 12, color: "#667085", marginTop: 16 }}>
        Meta: tip <strong>{tipId}</strong> • topic {topic} • age {ageBand} • user {userType}
      </p>

      <p style={{ fontSize: 12, color: "#667085", marginTop: 8 }}>
        If you didn’t request this, you can ignore this email.
      </p>
    </div>
  );
}

export default CalmTipEmail;
