import React, { useState, useEffect } from 'react';

const ImageRotator = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the index of the next image
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
    }, 1000); // Change the image every second (1000 milliseconds)

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [currentImageIndex, images]);

  return (
    <div className="relative">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={`absolute ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
        />
      ))}
    </div>
  );
};

export default ImageRotator;
