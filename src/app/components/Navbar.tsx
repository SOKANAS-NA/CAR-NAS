"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Moon, Sun } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);//USESTATE POUR LE MENU BURGARE
  const [theme, setTheme] = useState("light");//USESTATE POUR LE DARK/LIGHT MODE DONC PAR DEF IL EST LIGHT
  const [showCartDetails, setShowCartDetails] = useState(false);//USESTATE POUR LA CARTE DE PANIER AU DEBUT NON VISULLE
  const [showFavoritesDetails, setShowFavoritesDetails] = useState(false);//IDEM QUE LA PRECEDENTE USESTATE POUR LES FAVORIS AU DEBUT NON VISULLE
  const [favoritesCount, setFavoritesCount] = useState(0);//USESTAT POUR LE COMPTEUR DES FAVORIS
  const [cartCount, setCartCount] = useState(0);//USESTATE POUR LE COUNTER DE PANIER
  
    // ON IMPORTE LE USEPATHNAME DONNE PAR LE PACKAGE NEXT JS ET ON L UTILISE POUR CREER DES MENU DYYNAMIQUE EN FONCTION DU CHEMIN DANS LEQUEL ON SE TROUVE DANS LE CAS DE MON SITE UNE FOIS QUE SWITCH DE PAGE UNE BARRE HORIZONTALE ROUGE APPARAIT EN DESSOUS DE CHAQUE LIEN ACTUEL 
  const pathname = usePathname();

  // CETTE FONCTIONNALITE DE NE MARCHE QUE COTE CLIENT ET NON SERVEUR
  const linkClass = (path: string) =>
    `relative px-4 py-2 transition duration-300 ${
      pathname === path ? "font-bold border-b-2 border-red-500" : "hover:text-red-500"
    }`;   // ICI LE PATH REPRESENTE LECHEMIN ACTUEL AVEC COMPORTEMENT CONDITIONEL

  useEffect(() => {
    // LOCAL STORAGE EST UNE API OU LES DONNE SONT STOQUE COTE NAVOGATUER DE L UTILSATEUR MEME APRES FERMETURE DE L ONGLET 
    const storedTheme = localStorage.getItem("theme") || "light";//SI THEME N EST PAS ENCORE DEFINIT IL RETOURNE LIGHT PAR DEFAUT
    setTheme(storedTheme); //MISE A JOUR DU THEME DE L ETAT THEME AVEC LA VALEUR LIGHT
    // Applique la classe dark-theme en fonction du thème
    if (storedTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
//DANS GLOBAL CSS ON APPLIQUE LES COULEUR DE BASE QUAND LE SITE EST EN LIGHT TEXTE NOIR/ BACK EN BLACK ET L INVERSE QUAND IL EST EN DARKMODE TEXTE BLANC BACK EN NOIR 



    // Fonction pour charger les compteurs depuis localStorage
    const loadCounts = () => {
      try {
        const favoritesData = localStorage.getItem("favorites");
        const cartData = localStorage.getItem("cart");
        
        if (favoritesData) {
          const favorites = JSON.parse(favoritesData);
          setFavoritesCount(Array.isArray(favorites) ? favorites.length : 0);
        }
        
        if (cartData) {
          const cart = JSON.parse(cartData);
          setCartCount(Array.isArray(cart) ? cart.length : 0);
        }
      } catch (error) {
        console.error("Error loading counts from localStorage:", error);
      }
    };

    // Charger les compteurs au démarrage
    loadCounts();

    // Mettre en place un écouteur d'événements pour les mises à jour du localStorage
    const handleStorageChange = () => {
      loadCounts();
    };

    // Créer un événement personnalisé pour écouter les changements dans les cartes
    window.addEventListener("cartUpdated", handleStorageChange);
    window.addEventListener("favoritesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleStorageChange);
      window.removeEventListener("favoritesUpdated", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Sauvegarde le thème dans localStorage pour qu'il persiste
    localStorage.setItem("theme", newTheme);

    // Ajoute ou retire la classe dark-theme sur le body
    if (newTheme === "dark") {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/image/2.png"
                alt="Logo"
                width={100}
                height={100}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex gap-8 text-white">
            <Link href="/" className={linkClass("/")}>
              HOME
            </Link>
            <Link href="/cars" className={linkClass("/cars")}>
              CARS
            </Link>
            <Link href="/about" className={linkClass("/about")}>
              ABOUT
            </Link>
            
            {/* Liens de Connexion et Inscription */}
            <Link href="/connexion" className={linkClass("/connexion")}>
              LOGIN
            </Link>
            <Link href="/inscription" className={linkClass("/inscription")}>
              REGISTER
            </Link>
          </div>

          {/* Icônes de panier et favoris Desktop */}
          <div className="hidden md:flex items-center gap-4 text-white">
            {/* Icône Favoris */}
            <div className="relative">
              <button 
                className="p-2 text-white transition duration-300 hover:text-red-500"
                onClick={() => setShowFavoritesDetails(!showFavoritesDetails)}
              >
                <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </button>
              
              {/* Popup détail des favoris */}
              {showFavoritesDetails && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-black font-medium border-b">
                    {favoritesCount} {favoritesCount === 1 ? 'item' : 'items'} in favorites
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Click to see your favorites list
                  </div>
                  <div className="px-4 py-2">
                    <Link href="/favorites" className="block w-full text-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      View Favorites
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Icône Panier */}
            <div className="relative">
              <button 
                className="p-2 text-white transition duration-300 hover:text-red-500"
                onClick={() => setShowCartDetails(!showCartDetails)}
              >
                <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              
              {/* Popup détail du panier */}
              {showCartDetails && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                  <div className="px-4 py-2 text-black font-medium border-b">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'} in cart
                  </div>
                  <div className="px-4 py-2 text-sm text-gray-700">
                    Click to see your cart details
                  </div>
                  <div className="px-4 py-2">
                    <Link href="/cart" className="block w-full text-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                      View Cart
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bouton Mode + Icônes Mobile */}
          <div className="flex items-center gap-3">
            {/* Icônes panier et favoris pour mobile */}
            <div className="flex md:hidden items-center gap-2">
              {/* Icône Favoris Mobile */}
              <div className="relative">
                <Link href="/favorites">
                  <FontAwesomeIcon icon={faHeart} className="w-5 h-5 text-white" />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {favoritesCount}
                    </span>
                  )}
                </Link>
              </div>
              
              {/* Icône Panier Mobile */}
              <div className="relative">
                <Link href="/cart">
                  <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5 text-white" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Bouton Menu Mobile */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-white transition duration-300 hover:text-red-500"
                aria-label="Toggle navigation"
              >
                {isOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
              </button>
            </div>

            {/* Bouton de bascule du mode sombre */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white transition duration-300 hover:text-red-500"
              aria-label="Toggle Dark/Light Mode"
            >
              {theme === "light" ? <Moon color="white" size={30} /> : <Sun color="white" size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`fixed top-0 right-0 w-2/3 h-full bg-white text-black shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X size={28} className="text-black hover:text-red-500" />
          </button>
        </div>
        <nav className="flex flex-col items-center gap-2 mt-2 text-lg bg-white">
          <Link href="/" className="text-black hover:text-red-500" onClick={() => setIsOpen(false)}>
            HOME
          </Link>
          <Link href="/cars" className="text-black hover:text-red-500" onClick={() => setIsOpen(false)}>
            CARS
          </Link>
          <Link href="/about" className="text-black hover:text-red-500" onClick={() => setIsOpen(false)}>
            ABOUT
          </Link>
         
          {/* Liens de Connexion et Inscription dans le menu mobile */}
          <Link href="/connexion" className="text-black hover:text-red-500" onClick={() => setIsOpen(false)}>
            LOGIN
          </Link>
          <Link href="/inscription" className="text-black hover:text-red-500" onClick={() => setIsOpen(false)}>
            REGISTER
          </Link>

          {/* Liens vers favoris et panier dans le menu mobile */}
          <div className="w-full border-t mt-2 pt-2">
            <Link href="/favorites" className="flex items-center justify-center gap-2 text-black hover:text-red-500 py-2" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
              FAVORITES {favoritesCount > 0 && `(${favoritesCount})`}
            </Link>
            <Link href="/cart" className="flex items-center justify-center gap-2 text-black hover:text-red-500 py-2" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faShoppingBag} className="w-5 h-5" />
              CART {cartCount > 0 && `(${cartCount})`}
            </Link>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;