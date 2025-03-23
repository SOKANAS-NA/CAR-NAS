import { useEffect, useState } from "react";

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
  model:string;
  year:number;
  color:string;
  state:string;


}

export const UseCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      //ENVOI DE LA REQUETE A L API  AFIN D OTENIR UNE REPONSE
      try {
        const response = await fetch("https://example-data.draftbit.com/cars");
        if (!response.ok) { //SI L API EST GRATUITE ET OUVERTE ALORS L API EST TRANSMIE SOUS FORME DE JSON  SINON IL Y A UNE ERREUR ET CETTE ERREUR EST LANCEE
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log("Données API reçues:", data); 
        setCars(data); //UNE FOIS LES DONNE RECUPEREE ELLES SONT STOKEE DANS DATA
      } catch (err) {
        console.error("Erreur API:", err);
      } finally {
        setIsLoading(false); //CHARGEMENT TERMNINE
      }
    };

    fetchCars();
  }, []);
  

  return { cars, isLoading };
};
