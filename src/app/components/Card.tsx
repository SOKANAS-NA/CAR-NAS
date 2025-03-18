import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

interface Car {
  id: number;
  model: string;
  price: number;
  image?: string;
}

interface CarCardProps {
  car: Car;
  isFavorite: boolean;
  isInCart: boolean;
  toggleFavorite: (id: number) => void;
  toggleCart: (id: number) => void;
}

const CarCard: React.FC<CarCardProps> = ({
  car,
  isFavorite,
  isInCart,
  toggleFavorite,
  toggleCart,
}) => {
  if (!car) return null; // Sécurité contre les valeurs undefined

  return (
    <Link href={`/product/${car.id}`} passHref>
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col items-center cursor-pointer hover:shadow-xl transition duration-300">
        {car.image ? (
          <img
            src={car.image}
            alt={car.model}
            className="w-full h-40 object-cover mb-4 rounded"
          />
        ) : (
          <div className="w-full h-40 bg-gray-300 flex items-center justify-center rounded">
            🚗 Image indisponible
          </div>
        )}

        <h2 className="text-lg font-bold">{car.model}</h2>
        <p className="text-gray-600">
          Prix: {car.price ? `${car.price.toLocaleString()} €` : "Non disponible"}
        </p>

        <div className="mt-4 flex justify-between w-full">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(car.id);
            }}
            className={`px-4 py-2 rounded flex items-center space-x-2 ${isFavorite ? "bg-red-500 text-white" : "bg-gray-300"}`}
          >
            <FontAwesomeIcon icon={faHeart} className={`w-5 h-5 ${isFavorite ? "text-white" : "text-red-500"}`} />
            <span>{isFavorite ? "❤️ Favori" : "🤍 Ajouter aux favoris"}</span>
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCart(car.id);
            }}
            className={`px-4 py-2 rounded flex items-center space-x-2 ${isInCart ? "bg-green-500 text-white" : "bg-blue-500 text-white"}`}
          >
          <FontAwesomeIcon icon={faShoppingBag} className={`w-5 h-5 ${isInCart ? "text-white" : "text-blue-500"}`} />

            <span>{isInCart ? "🛒 Ajouté" : "🛍 Ajouter au panier"}</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;
