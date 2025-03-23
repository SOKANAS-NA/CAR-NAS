"use client";
import Link from "next/link";
import ImageSlider from "../../img/imageSlider";

const images = [
  "image/luxury-car-interior-brown-black-colors.jpg",
  "image/sport-car-with-black-white-autotuning-driving-forest.jpg",
  "image/white-offroader-jeep-parking.jpg",
  "image/white-sedan-driving-highway-accross-forest.jpg",
];

function Carousel() {
  return (
    <div className="relative w-[80%] mx-auto rounded-lg shadow-lg overflow-hidden">

      {/* Carrousel */}
      <ImageSlider imageUrls={images} />

      {/* Bouton "DISCOVER" superposé */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <Link href="/cars">
          <button className="px-6 py-3 bg-white text-black font-bold rounded-md shadow-lg hover:bg-gray-200 transition duration-300">
            DISCOVER
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Carousel;
