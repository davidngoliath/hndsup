import localFont from "next/font/local";
import "./globals.css";
import ModalContextProvider from "./contexts/ModalContext";
import Script from "next/script";
import Head from 'next/head'

const DMSans = localFont({
  src: "./fonts/DMSans.woff",
  variable: "--font-dm-sans",
  weight: "100 900",
});

const DMSansItalic = localFont({
  src: "./fonts/DMSans-Italic.woff",
  variable: "--font-dm-sans-italic",
  weight: "100 900",
})

const RationalTWDisplayLight = localFont({
  src: "./fonts/Rational-TW-Display-Light.woff",
  variable: "--font-rational-tw-display-light",
  weight: "100 900",
});

const RationalTWDisplaySemibold = localFont({
  src: "./fonts/Rational-TW-Display-Semibold.woff",
  variable: "--font-rational-tw-display-semibold",
  weight: "100 900",
});

const RationalTWTextLight = localFont({
  src: "./fonts/Rational-TW-Text-Light.woff",
  variable: "--font-rational-tw-text-light",
  weight: "100 900",
});

const RationalTWTextSemibold = localFont({
  src: "./fonts/Rational-TW-Text-Semibold.woff",
  variable: "--font-rational-tw-text-semibold",
  weight: "100 900",
});

const SilkSerifExtraLightItalic = localFont({
  src: "./fonts/Silk-Serif-ExtraLight-Italic.woff",
  variable: "--font-silk-serif-extra-light-italic",
  weight: "100 900",
});


export const metadata = {
  title: "Hndsup | The Product We Hope To Never Launch",
  description: "Hndsup is the wearable that doesn’t tell time—it protects lives. Designed to keep you safe during police encounters. Learn more and support the mission.",
  keywords: "Hndsup, wearable, police encounters, safety, emergency alert, Courageous Conversation Global Foundation",
  openGraph: {
    title: "Hndsup | Emergency Alert Wearable for Police Stops",
    description: "Hndsup is the wearable that doesn’t tell time—it protects lives. Designed to keep you safe during police encounters. Learn more and support the mission.",
    url: "https://hndsup.com/",
    siteName: "Hndsup",
    type: "website",
    logo: "/images/logosmall.jpg",
    images: [
      {
        url: "/images/shareimage.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hndsup | Emergency Alert Wearable",
    description: "Wearable emergency alert device to promote safety during police stops.",
    site: "@CCAboutRace",
    images: [
      {
        url: "/images/shareimage.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">

      {/*<!-- Global site tag (gtag.js) - Google Analytics -->*/}
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FWE02ZBMVR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FWE02ZBMVR');
          `}
        </Script>

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KDQCRZ7S');
          `}
        </Script>
      <ModalContextProvider>
        <body className={`${DMSans.variable} ${DMSansItalic.variable} ${RationalTWDisplayLight.variable} ${RationalTWDisplaySemibold.variable} ${RationalTWTextLight.variable} ${RationalTWTextSemibold.variable} ${SilkSerifExtraLightItalic.variable}`}>
          {children}
        </body>
      </ModalContextProvider>
    </html>

  );
}
