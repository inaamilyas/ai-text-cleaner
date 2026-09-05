import { ImageResponse } from "next/og";

export const dynamic = "force-static";
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
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          backgroundColor: "#F0FFFA",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <svg width="44" height="44" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#016F4A" />
            <path
              d="M9 17 H13 L16 21 L23 10"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#016F4A",
              display: "flex",
            }}
          >
            AI Text Cleaner
          </div>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 68,
            fontWeight: 700,
            color: "#001911",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            display: "flex",
            maxWidth: 1000,
          }}
        >
          Paste AI text. Get clean text.
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 30,
            fontWeight: 400,
            color: "#474747",
            display: "flex",
            maxWidth: 900,
          }}
        >
          Remove hidden characters and formatting artifacts, entirely in your
          browser.
        </div>
      </div>
    ),
    { ...size }
  );
}
