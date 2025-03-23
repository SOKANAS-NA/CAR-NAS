"use client";
import "ldrs/ring";

import React, { useState, useEffect } from "react";
import { UseCars } from "../api/userCards"; //RECUPERATION DES DONNE DE L API STOCKE DANS data
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingBag,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Link from "next/link";


interface Car {
  id: number;
  make_id: string;
  model: string;
  price: number;
  year: number;
  image: string;
  car:string;
}

const CarsPage = () => {
  const { cars} = UseCars();//API CREE DANS DOSSIER API ET IMPORTE afin de l utiliser où je souhaite  
  const [favorites, setFavorites] = useState<number[]>([]);// STATE POUR STOCKER LES FAVORIS
  const [cart, setCart] = useState<number[]>([]);//STATE POUR STOCKER LE PANIER
  const [searchTerm, setSearchTerm] = useState("");// STATE POUR LE CHAMP DE RECHERCHE
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all"); // Filtre par prix
  const [selectedYearRange, setSelectedYearRange] = useState<string>("all"); // Filtre par année


 // CHARGEMENT DES DONNEES STOCKEES DANS LOCAL STORAGE AU MONTAGE DU COMPOSANT
  useEffect(() => {
    try { //EXECUTION DU CODE A L INTERIEUR
      const savedFavorites = localStorage.getItem("favorites");
      const savedCart = localStorage.getItem("cart");//RECUPERATION DES DONES CLE FAVORITES ET PANIER
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      if (savedCart) setCart(JSON.parse(savedCart)); //VALEUR RETOURNEE EN CHAINE DE CARACTERE
    } catch (error) {//GESTION D ERREUR INTERNE
      console.error("Erreur lors du chargement des données:", error); //FACILITER LE DEBOGAGE GRACE A CONSOLE LOG
    }
  }, []);

  //Fonction utilitaire en TypeScript qui met à jour le localStorage et envoie un événement personnalisé pour informer dautres parties de l application qu une mise à jour a eu lieu

  const updateLocalStorageAndDispatchEvent = (key: string, data: number[]) => {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new Event(`${key}Updated`));
  };//INFORMER LES UATRES COMPOSANTS D UNE NOUVELLE MISE A JOUR ET SYNCHRONSISER L ETAT ENTRE PLUSIEURS ONGLETS/FENETRES


  //LES FONCTIONS toggleFavorite ET toggleCart AJOUTENT OU SUPPRIMENT UN id D'UNE LISTE (FAVORIS OU PANIER), METTENT À JOUR L'ÉTAT AVEC setFavorites OU setCart, STOCKENT LES DONNÉES DANS localStorage ET ENVOIENT UN ÉVÉNEMENT POUR INFORMER D'AUTRES PARTIES DE L'APPLICATION
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.includes 
      //L ETAT PRECENDENT RECUPERE
      (id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];// SI ID EST DEJA PRESENT DANS LA LISTE IL EST SUPPPRIME EN FILTRANT LA LISTE//SINON IL EST AJOUTE DANS LA LISTE 
      updateLocalStorageAndDispatchEvent("favorites", updatedFavorites);
      return updatedFavorites;//MISE A JOUR
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
  };//IDEM QUE LES FAVORIS

  // Filtrage des voitures par modèle, prix et année
  const filteredCars = cars.filter((car) => {
    const matchesSearchTerm = car.model
      .toLowerCase()//TOUT TRANSFOME EN MINUSCULE POUR EVITER LES PROBLEMES DE CASSSE
      .includes(searchTerm.toLowerCase());

    const matchesPrice =
      selectedPriceRange === "all"
        ? true
        : selectedPriceRange === "low"
        ? car.price < 20000
        : selectedPriceRange === "medium"
        ? car.price >= 20000 && car.price < 50000
        : car.price >= 50000;

    const matchesYear =
      selectedYearRange === "all"
        ? true
        : selectedYearRange === "new"
        ? car.year >= 2000 
        : selectedYearRange === "between"
        ? car.year >= 1990 && car.year <= 2000 
        : selectedYearRange === "old"
        ? car.year <= 1990
        : true;

    return matchesSearchTerm && matchesPrice && matchesYear;//Le return est utilisé pour renvoyer un tableau filtré qui ne contient que les éléments qui respectent la condition définie dans filter()
  });
  

  return (
    <div className="min-h-screen p-6 mt-40 bg-[url('/image/DALL·E 2025-03-22 10.41.31 - A stylish and modern garage-themed background for a car dealership, without any cars. The scene features a sleek, well-lit showroom with polished conc.webp')] bg-cover bg-center">

      <h1 className="text-4xl font-bold text-center uppercase tracking-wider mb-5">
        Our Collection
      </h1>
      <div className="flex justify-end mb-20">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search for a car..."
            className="text-black w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>

        <div className="ml-6 flex gap-4">
          {/* Filtre par prix */}
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="all">All Prices</option>
            <option value="low">Under 20,000€</option>
            <option value="medium">20,000€ - 50,000€</option>
            <option value="high">Above 50,000€</option>
          </select>

          {/* Filtre par année */}
          <select
            value={selectedYearRange}
            onChange={(e) => setSelectedYearRange(e.target.value)}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          >
            <option value="all">All Years</option>
            <option value="new">Newer than 2000</option>
            <option value="between">Between 2000-1990</option>
            <option value="old">Older than 1990</option>
          </select>
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
      className="bg-gradient-to-r from-blue-500 to-blue-900 shadow-lg rounded-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
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
            isFavorite
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <FontAwesomeIcon
            icon={faHeart}
            className={`w-6 h-6 ${isFavorite ? "text-white" : "text-red-500"}`}
          />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            toggleCart(car.id);
          }}
          className={`px-6 py-3 rounded-lg text-white transition-colors duration-300 ${
            isInCart
              ? "bg-black hover:bg-gray-800"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          <FontAwesomeIcon
            icon={faShoppingBag}
            className={`w-6 h-6 ${isInCart ? "text-white" : "text-black"}`}
          />
        </button>
      </div>
    </motion.div>
  );
};

export default CarsPage;
