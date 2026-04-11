import { useState, useEffect } from 'react';
import './Carousel.css';
import vegetables from '../assets/vegetables.jpg';
import fruits from '../assets/fruits.jpg';
import grocery from '../assets/grocery.jpg';
import grains from '../assets/grains.jpg';

const slides = [
  { id: 1, src: vegetables, alt: 'Fresh vegetables' },
  { id: 2, src: fruits, alt: 'Colorful fruits' },
  { id: 3, src: grocery, alt: 'Groceries' },
  { id: 4, src: grains, alt: 'Grains' },
];


export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToSlide = (index) => setCurrentIndex(index);

  return (
    <div className="carousel-wrapper">

      <div className="carousel-container">
        <div
          className="slides-wrapper"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div className="slide" key={slide.id}>
              <img src={slide.src} alt={slide.alt} />
            </div>
          ))}
        </div>
      </div>

      <div className="dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>

      <button className="arrow left" onClick={goToPrevious}>❮</button>
      <button className="arrow right" onClick={goToNext}>❯</button>
    </div>
  );
}