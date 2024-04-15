import { Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata = {
  title: "Hextagram",
  description: "One place to find and share your Hextagram worthy photos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
