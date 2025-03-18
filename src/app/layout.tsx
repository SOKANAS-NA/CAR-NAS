import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "AutoNas",
  description: "Concéssionaire de voitures de luxe",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
  
        <script src="https://cdn.tailwindcss.com"></script>
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
