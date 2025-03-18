"use client";

import React, { useState, useEffect } from "react";
import { UseCars } from "../api/userCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag, faSearch } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";

interface Car {
  id: number;
  model: string;
  price: number;
  image: string;
  
}

const CarsPage = () => {
  const { cars, isLoading } = UseCars();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  //DONNEES STOCKES DU PANIER DANS LE NAVIGATEUR DE L UTILISATEUR GRACE AU LOCAL STORAGE

  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("favorites"); //STOCKAGE DE FAVORIS SELON LA CLE ""
      const savedCart = localStorage.getItem("cart"); //IDEM QUE FAVORIS 
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites)); // renvoyant une chaine de caracters en Json et mise a jour par la fonction setFavorites de l etat favorites du composant afin de les aficher à l utlisateur
      if (savedCart) setCart(JSON.parse(savedCart));// renvoyant une chaine de caracters en Json et mise a jour par la fonction setCart de l etat cart du composant afin de les aficher à l utlisateur
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);//GESTION D ERREURS
    }
  }, []); //FONCTION EXECUTEE UNE SEULE FOIS CAR [] JUSTE APRES LE MOUNTIG (CCYLE DE VIE/QD REACT AI RENDU LE COMPOSANT POUR LA PREMIERE FOIS)

  //En resume: ce mecanism permet de restaurer l etat du panier et des favoris de l utilisateur entre les sessions, même si l'utilisateur ferme et rouvre son navigateur les données sont stockées localement dans le navigateur et peuvent être récupérées à chaque chargement de la page

  const updateLocalStorageAndDispatchEvent = (key: string, data: number[]) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event(`${key}Updated`));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      updateLocalStorageAndDispatchEvent("favorites", updatedFavorites);
      return updatedFavorites;
    });
  };

  const toggleCart = (id: number) => {
    setCart((prev) => {
      const updatedCart = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      updateLocalStorageAndDispatchEvent("cart", updatedCart);
      return updatedCart;
    });
  };

  const filteredCars = cars.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
      </div>
    );

  return (
    <div className="min-h-screen p-6 mt-40">
      <h1 className="text-3xl font-bold text-center">OUR COLLECTION❤️</h1>
      
      <div className="flex justify-end mb-20">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for a car..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
        {filteredCars.map((car, index) => (
          <CarCard
            key={car.id}
            car={car}
            isFavorite={favorites.includes(car.id)}
            isInCart={cart.includes(car.id)}
            toggleFavorite={toggleFavorite}
            toggleCart={toggleCart}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const CarCard: React.FC<{
  car: Car;
  isFavorite: boolean;
  isInCart: boolean;
  toggleFavorite: (id: number) => void;
  toggleCart: (id: number) => void;
  index: number;
}> = ({ car, isFavorite, isInCart, toggleFavorite, toggleCart, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
    >
      <Link href={`/product/${car.id}`} className="w-full">
        <div className="w-full h-80 overflow-hidden rounded-lg mb-4 cursor-pointer">
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      <h2 className="text-xl font-semibold text-gray-800 mb-2">{car.model}</h2>
      <p className="text-lg font-medium text-gray-600 mb-4">{car.price} €</p>

      <div className="flex gap-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(car.id);
          }}
          className={`px-6 py-3 rounded-lg text-white transition-colors duration-300 ${
            isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <FontAwesomeIcon icon={faHeart} className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"}`} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCart(car.id);
          }}
          className={`px-6 py-3 rounded-lg text-white transition-colors duration-300 ${
            isInCart ? "bg-black hover:bg-gray-800" : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <FontAwesomeIcon icon={faShoppingBag} className={`w-6 h-6 ${isInCart ? "text-white" : "text-black"}`} />
        </button>
      </div>
    </motion.div>
  );
};

export default CarsPage;
