"use client";
import React from "react";

// Types pour les données des cartes
interface ServiceCardData {
  id: number;
  title: string;
  description: string;
  imageSrc: string;
  ctaText: string;
  ctaLink: string;
}

// Composant de carte individuelle
const ServiceCard: React.FC<{ data: ServiceCardData }> = ({ data }) => (
  <div className=" bg-white rounded-lg overflow-hidden shadow-lg flex flex-col transition transform hover:scale-105 duration-300">
    <img src={data.imageSrc} alt={data.title} className="w-full h-48 object-cover" />
    <div className="p-5 flex-grow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{data.title}</h2>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <button 
        className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => window.location.href = data.ctaLink}
      >
        {data.ctaText}
      </button>
    </div>
  </div>
);

// Composant principal avec un fond bleu clair pour toute la section
const ServicesList: React.FC<{ cards: ServiceCardData[] }> = ({ cards }) => (
  <div className="p-6">
    <h1 className="text-4xl font-extrabold text-center  mb-12">Our Services</h1>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {cards.map((card) => (
        <ServiceCard key={card.id} data={card} />
      ))}
    </div>
  </div>
);

// Données des cartes
const servicesData: ServiceCardData[] = [
  { id: 1, title: "Forfaits d'entretien sur mesure", description: "Diagnostics, pièces d'origine, techniciens certifiés.", imageSrc: "/image/muscular-car-service-worker-repairing-vehicle.jpg", ctaText: "Discover", ctaLink: "/cars" },
  { id: 2, title: "Véhicules d'occasion certifiés", description: "Qualité assurée à prix compétitif.", imageSrc: "/image/person-preparing-get-driver-license.jpg", ctaText: "Discover", ctaLink: "/cars" },
  { id: 3, title: "Financement personnalisé", description: "Solutions adaptées à votre budget.", imageSrc: "/image/stock-market-exchange-economics-investment-graph.jpg", ctaText: "Discover", ctaLink: "/cars" },
  { id: 4, title: "Service pour véhicules électriques", description: "Spécialistes des véhicules électriques.", imageSrc: "/image/electric-vehicle-charger-plug-with-digital-display.jpg", ctaText: "Discover", ctaLink: "/cars" },
  { id: 5, title: "Promotions saisonnières", description: "Remises exclusives sur les véhicules.", imageSrc: "/image/golden-percentage-sign-symbol-yellow-discount-sale-promotion-concept-by-3d-render.jpg", ctaText: "Discover", ctaLink: "/cars" },
  { id: 6, title: "Services connectés", description: "Fonctionnalités numériques de votre véhicule.", imageSrc: "/image/happy-woman-with-phone.jpg", ctaText: "Discover", ctaLink: "/cars" },
];

// Exemple d'utilisation du composant
const ServicesCards: React.FC = () => <ServicesList cards={servicesData} />;

export default ServicesCards;
