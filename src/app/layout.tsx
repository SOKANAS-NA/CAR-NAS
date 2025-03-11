import "./globals.css"; // Import global styles here
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Mon Site Next.js",
  description: "Un site performant avec Next.js",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gray-100">
        {/* Navbar and Footer are now inside the body */}
        <Navbar />
        {/* Main content of each page will be inserted here */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
