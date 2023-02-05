import { Inter } from "@next/font/google";
import localFont from "@next/font/local";

const inter = Inter({ subsets: ["latin"] });

const rigatoni = localFont({
  src: [
    {
      path: "../assets/fonts/rigatoni-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export const fonts = { inter, rigatoni };
