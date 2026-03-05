import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Samen - De app voor koppels die willen groeien";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FBF9F6 0%, #E8DDD3 100%)",
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: 120,
            height: 120,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 28,
            background: "linear-gradient(135deg, #C4704B, #A85A3A)",
            marginBottom: 40,
          }}
        >
          <svg
            width="72"
            height="72"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#1B2838",
            marginBottom: 16,
          }}
        >
          Samen
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#6B7C8F",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          De app voor koppels die willen groeien
        </div>

        {/* Domain */}
        <div
          style={{
            fontSize: 22,
            color: "#C4704B",
            marginTop: 32,
            fontWeight: 600,
          }}
        >
          samenapp.nl
        </div>
      </div>
    ),
    { ...size }
  );
}
