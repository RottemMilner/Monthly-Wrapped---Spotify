// Slideshow.js
import React, { useState, useEffect } from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import TopGenresButton from './TopGenresButton';

const Slideshow = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSlideshowRunning, setIsSlideshowRunning] = useState(true);

  const slides = [
    <TopTracks key={0} user={user} />,
    <TopArtists key={1} />,
    <TopGenresButton key={2} />,
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const startAutoChange = () => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  };

  const toggleSlideshow = () => {
    setIsSlideshowRunning((prev) => !prev);
  };

  useEffect(() => {
    let clearAutoChange;
    if (isSlideshowRunning) {
      clearAutoChange = startAutoChange();
    }

    return () => {
      if (clearAutoChange) {
        clearAutoChange();
      }
    };
  }, [isSlideshowRunning]);

  return (
    <div className="slideshow-container">
      <div>
        <button onClick={prevSlide} className="slideshow-arrow">&#10094;</button>
        <button onClick={toggleSlideshow} className="slideshow-stop">
          {isSlideshowRunning ? 'Stop Slideshow' : 'Start Slideshow'}
        </button>
        <button onClick={nextSlide} className="slideshow-arrow">&#10095;</button>
      </div>
      <div className="slide" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide-content">
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
