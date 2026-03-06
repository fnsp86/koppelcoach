import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Samen | De app voor koppels die willen groeien",
    template: "%s | Samen App",
  },
  description:
    "Versterk jullie relatie met dagelijkse check-ins, leuke quizzen, gespreksstarters en een persoonlijke relatiepols. Samen is de app die koppels helpt om dichter bij elkaar te komen.",
  keywords: [
    "relatie app",
    "koppel app",
    "samen app",
    "relatie versterken",
    "koppelcoach",
    "relatie check-in",
    "relatie quiz",
    "date idee",
    "relatiepols",
    "communicatie relatie",
    "relatie verbeteren",
    "koppel activiteiten",
  ],
  metadataBase: new URL("https://samenapp.nl"),
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Samen",
    url: "https://samenapp.nl",
    title: "Samen | De app voor koppels die willen groeien",
    description:
      "Versterk jullie relatie met dagelijkse check-ins, quizzen, gespreksstarters en meer. Download de Samen app.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samen | De app voor koppels die willen groeien",
    description:
      "Dagelijkse check-ins, quizzen en gespreksstarters voor koppels. Download de Samen app.",
  },
  alternates: {
    canonical: "https://samenapp.nl",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "Samen",
              operatingSystem: "iOS, Android",
              applicationCategory: "LifestyleApplication",
              description:
                "De app voor koppels die willen groeien. Dagelijkse check-ins, quizzen, gespreksstarters en een persoonlijke relatiepols.",
              url: "https://samenapp.nl",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
