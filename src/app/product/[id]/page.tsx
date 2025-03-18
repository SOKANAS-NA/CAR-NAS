"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { UseCars } from "../../api/userCards";

interface Car {
  id: number;
  make_id: string;
  model: string;
  year: number;
  vin: string;
  color: string;
  price: number;
  city: string;
  state: string;
  postal: number;
  longitude: number;
  latitude: number;
  description: string;
  seller: string;
  "seller-name": string;
  image: string;
  image_thumb: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const { cars, isLoading } = UseCars();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    if (cars.length > 0) {
      const foundCar = cars.find((c) => c.id === Number(id)) || null;
      setCar(foundCar);
    }
  }, [id, cars]);

  if (isLoading || !car) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-2xl font-bold">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-10 px-6 flex flex-col items-center mt-40">
      <h1 className="text-4xl font-extrabold mb-6">
        {car.make_id} {car.model} ({car.year})
      </h1>

      {/* Image de la voiture */}
      <div className="w-full max-w-3xl shadow-lg rounded-lg overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="w-full object-cover"
        />
      </div>

      {/* Carte de détails */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Détails du véhicule</h2>

        <div className="grid grid-cols-2 gap-4 text-gray-700 text-lg">
          <p><strong>Modèle:</strong> {car.model}</p>
          <p><strong>Année:</strong> {car.year}</p>
          <p><strong>Couleur:</strong> {car.color}</p>
          <p><strong>Prix:</strong> {car.price.toLocaleString()} €</p>
          <p><strong>VIN:</strong> {car.vin}</p>
          <p><strong>Localisation:</strong> {car.city}, {car.state}</p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Description</h2>
        <p className="text-lg text-gray-600 leading-relaxed mt-2">{car.description}</p>

        <h2 className="text-2xl font-semibold mt-6 text-gray-800">Vendeur</h2>
        <p className="text-lg text-gray-700 mt-2">
          <strong>{car["seller-name"]}</strong> ({car.seller})
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
