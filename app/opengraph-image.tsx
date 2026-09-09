import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * The share card used by Google, LinkedIn, WhatsApp, Slack and X.
 * Generated at build time rather than shipped as a binary, so it always
 * reflects lib/site.ts and there is no PNG to keep in sync by hand.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#06080f",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Warm rule echoing the site's signal gradient */}
        <div
          style={{
            display: "flex",
            width: 160,
            height: 8,
            borderRadius: 4,
            background: "linear-gradient(90deg, #f5b841 0%, #e2703a 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              color: "#edeae3",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 38,
              color: "#f5b841",
              marginTop: 20,
              letterSpacing: "-0.01em",
            }}
          >
            {site.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 28,
            color: "#8a93a6",
          }}
        >
          <div style={{ display: "flex" }}>
            {site.totalBuilt} websites built since {site.since}
          </div>
          <div style={{ display: "flex", color: "#edeae3" }}>
            {site.url.replace(/^https?:\/\//, "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
