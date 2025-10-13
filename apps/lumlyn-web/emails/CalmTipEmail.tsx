// apps/lumlyn-web/emails/CalmTipEmail.tsx
import * as React from "react";

type CalmTipEmailProps = {
  /** Textul complet al calm tip-ului. Poate conține \n\n pentru paragrafe. */
  tipText: string;
  /** Titlul din headerul emailului (opțional). */
  headline?: string;
  /** URL pentru CTA (opțional). */
  ctaUrl?: string;
  /** Eticheta butonului (opțional). */
  ctaLabel?: string;
  /** Logo absolut sau CID (opțional). */
  logoSrc?: string;
};

export default function CalmTipEmail({
  tipText,
  headline = "Your calm tip",
  ctaUrl,
  ctaLabel = "Open Lumlyn",
  logoSrc,
}: CalmTipEmailProps) {
  // Normalizează și sparge pe paragrafe
  const paragraphs = String(tipText || "")
    .trim()
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    // Email-safe layout (tablă + inline styles)
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{headline}</title>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#F6F4FF" }}>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{ backgroundColor: "#F6F4FF", padding: "24px 0" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  width={600}
                  cellPadding={0}
                  cellSpacing={0}
                  role="presentation"
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    background: "rgba(249,246,255,0.90)",
                    borderRadius: "12px",
                    padding: "24px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
                    color: "#1A1A1A",
                  }}
                >
                  <tbody>
                    {/* Logo */}
                    {logoSrc ? (
                      <tr>
                        <td align="center" style={{ paddingBottom: "12px" }}>
                          <img
                            src={logoSrc}
                            width={48}
                            height={48}
                            alt="Lumlyn"
                            style={{ display: "block", border: 0 }}
                          />
                        </td>
                      </tr>
                    ) : null}

                    {/* Headline */}
                    <tr>
                      <td align="center" style={{ paddingBottom: "8px" }}>
                        <h1
                          style={{
                            margin: 0,
                            fontSize: "22px",
                            lineHeight: "28px",
                            fontWeight: 700,
                          }}
                        >
                          {headline}
                        </h1>
                      </td>
                    </tr>

                    {/* Tip content */}
                    <tr>
                      <td
                        align="center"
                        style={{
                          paddingTop: "12px",
                          paddingBottom: "12px",
                          background:
                            "linear-gradient(90deg, rgba(158,140,246,0.80) 0%, rgba(201,189,249,0.80) 100%)",
                          borderRadius: "12px",
                          boxShadow: "inset 0 4px 24px rgba(0,0,0,0.10)",
                        }}
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{ width: "100%" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  padding: "12px 16px",
                                  maxWidth: "560px",
                                }}
                              >
                                {paragraphs.length === 0 ? (
                                  <p
                                    style={{
                                      margin: 0,
                                      fontSize: "16px",
                                      lineHeight: "24px",
                                      fontWeight: 600,
                                    }}
                                  >
                                    …
                                  </p>
                                ) : (
                                  paragraphs.map((p, idx) => (
                                    <p
                                      key={idx}
                                      style={{
                                        margin: idx === 0 ? 0 : "12px 0 0 0",
                                        fontSize: "16px",
                                        lineHeight: "24px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      {p}
                                    </p>
                                  ))
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* CTA */}
                    {ctaUrl ? (
                      <tr>
                        <td align="center" style={{ paddingTop: "16px" }}>
                          {/* IMPORTANT: <a>, nu next/link */}
                          <a
                            href={ctaUrl}
                            style={{
                              display: "inline-block",
                              padding: "12px 16px",
                              borderRadius: "12px",
                              border: "1px solid #D0D5DD",
                              backgroundColor: "#FFFFFF",
                              color: "#1A1A1A",
                              textDecoration: "none",
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "16px",
                            }}
                          >
                            {ctaLabel}
                          </a>
                        </td>
                      </tr>
                    ) : null}

                    {/* Footer minimal */}
                    <tr>
                      <td
                        align="center"
                        style={{
                          paddingTop: "24px",
                          color: "#667085",
                          fontSize: "12px",
                          lineHeight: "18px",
                        }}
                      >
                        You’re receiving this because you asked Lumlyn to email you the
                        full calm tip. If this wasn’t you, you can ignore this email.
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* legal */}
                <table
                  role="presentation"
                  width={600}
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    marginTop: "8px",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
                    color: "#98A2B3",
                    fontSize: "11px",
                    lineHeight: "16px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td align="center">
                        © {new Date().getFullYear()} Lumlyn
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
