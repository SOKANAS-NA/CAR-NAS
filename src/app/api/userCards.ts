import { useEffect, useState } from "react";

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const UseCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("https://example-data.draftbit.com/cars");
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Données API reçues:", data); 
        setCars(data);
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  return { cars, isLoading };
};
