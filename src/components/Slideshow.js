// Slideshow.js
import React, { useState, useEffect } from 'react';
import TopTracks from './TopTracks';
import TopArtists from './TopArtists';
import TopGenresButton from './TopGenresButton';

const Slideshow = ({ user }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <TopTracks key={0} user={user} />,
    <TopArtists key={1} />,
    <TopGenresButton key={2} />,
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const startAutoChange = () => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  };

  useEffect(() => {
    const clearAutoChange = startAutoChange();
    return () => clearAutoChange();
  }, []);

  return (
    <div>
      {slides[currentSlide]}
    </div>
  );
};

export default Slideshow;
