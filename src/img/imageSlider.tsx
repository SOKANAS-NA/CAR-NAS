import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import "../img/imageSlider.css";

// Définition des props attendues par le composant (un tableau d'URLs d'images)
interface ImageSliderProps {
  imageUrls: string[];
}

function ImageSlider({ imageUrls }: ImageSliderProps) {
  // Création d'un state pour stocker l'index de l'image actuellement affichée
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    // Incrémente l'index et revient à 0 si c'est la dernière image
    setImageIndex((index) => (index + 1) % imageUrls.length);
  }

  function showPreviousImage() {
    // Decremente l index et revient à la dernière image si on est à la première
    setImageIndex((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
  }

  return (
    <div className="slider-container">
      {/* Affichage de l image courante */}

      <img src={imageUrls[imageIndex]} className="img-slider" alt="slider" />
      <button onClick={showPreviousImage} className="img-slider-btn left-btn">
        <ArrowBigLeft />
      </button>
      <button onClick={showNextImage} className="img-slider-btn right-btn">
        <ArrowBigRight />
      </button>
    </div>
  );
}

export default ImageSlider;
