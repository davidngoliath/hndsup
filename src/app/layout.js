import localFont from "next/font/local";
import "./globals.css";
import ModalContextProvider from "./contexts/ModalContext";

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
  title: "Hndsup",
  description: "",
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <ModalContextProvider>
        <body className={`${DMSans.variable} ${DMSansItalic.variable} ${RationalTWDisplayLight.variable} ${RationalTWDisplaySemibold.variable} ${RationalTWTextLight.variable} ${RationalTWTextSemibold.variable} ${SilkSerifExtraLightItalic.variable}`}>
          {children}
        </body>
      </ModalContextProvider>
    </html>

  );
}
