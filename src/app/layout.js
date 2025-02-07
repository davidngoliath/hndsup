// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const KiaBold = localFont({
//   src: "./fonts/KiaSignatureBold.woff",
//   variable: "--font-kia-bold",
//   weight: "100 900",
// });
// const KiaRegular = localFont({
//   src: "./fonts/KiaSignatureRegular.woff",
//   variable: "--font-kia-regular",
//   weight: "100 900",
// });

const DMSans = localFont({
  src: "./fonts/DMSans.woff",
  variable: "--font-dm-sans",
  weight: "100 900",
});

const DMSansItalic = localFont ({
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


// DMSans-Italic.woff
// DMSans.woff
// Rational-TW-Display-Light.woff
// Rational-TW-Display-Semibold.woff
// Rational-TW-Text-Light.woff
// Rational-TW-Text-Semibold.woff
// Silk-Serif-ExtraLight-Italic.woff


export const metadata = {
  title: "Hndsup",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${DMSans.variable} ${DMSansItalic.variable} ${RationalTWDisplayLight.variable} ${RationalTWDisplaySemibold.variable} ${RationalTWTextLight.variable} ${RationalTWTextSemibold.variable} ${SilkSerifExtraLightItalic.variable}`}>
        {children}
      </body>
    </html>
  );
}
