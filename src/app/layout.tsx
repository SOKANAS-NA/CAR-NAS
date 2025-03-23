import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "AutoNas",
  description: "Concéssionaire de voitures de luxe",
};
 {/*REACTNODE FACILITE LA REUTILISATION DU COMPOSANT AVEC SECURITE DU TYPE  */}
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
  
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-gray-100">
       
        <Navbar />
        {/* ON PLACE LES ELEMENTS HTML QUI SERONT VISUELS DANS TOUTES LES PAGES  */}
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
