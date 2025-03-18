import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import "../img/imageSlider.css";

interface ImageSliderProps {
  imageUrls: string[];
}

function ImageSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((index) => (index + 1) % imageUrls.length);
  }

  function showPreviousImage() {
    setImageIndex((index) => (index === 0 ? imageUrls.length - 1 : index - 1));
  }

  return (
    <div className="slider-container">
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
