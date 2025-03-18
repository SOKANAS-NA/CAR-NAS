"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import styles from "./page.module.css";
import Link from "next/link";
import Carousel from "./components/Carousel";
import CardData from "./components/CardData";

// Interface pour les voitures
interface Car {
  id: number;
  model: string;
  price: number;
  image: string;
}

// Fonction pour mélanger un tableau (Algorithme de Fisher-Yates)
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://example-data.draftbit.com/cars");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data: Car[] = await response.json();
        console.log("Données API reçues:", data);

        // Mélanger et sélectionner 6 voitures
        const randomCars = shuffleArray([...data]).slice(0, 6);
        setCars(randomCars);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <main className="flex items-center justify-center min-h-[80vh] mt-20">
        <div className="relative w-full">
          <h1 className={styles.text}>#CHOOSE YOUR BESTIE</h1>
          <img
            src="/image/full-shot-couple-near-car.jpg"
            alt="Luxurious Car Parked on Highway"
            width={100}
            height={60}
            className="rounded-lg w-full h-[70vh] object-cover"
          />
        </div>
      </main>

      {/* Section pour les voitures les mieux notées */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Nos 6 voitures les mieux notées
          </h2>

          {isLoading ? (
            <p className="text-gray-500">loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-8">
              {cars.map((car, index) => (
                <motion.div
                  key={car.id}
                  className="bg-white p-6 rounded-lg shadow-lg h-[450px] flex flex-col transition-transform duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img
                    src={car.image}
                    alt={car.model}
                    className="w-full h-56 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold">{car.model}</h3>
                
                  <Link href="/cars">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600 transition duration-300">
                      Voir plus
                    </button>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Carousel />
      <CardData />
    </>
  );
}
