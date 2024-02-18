'use client'
import React, { useEffect, useState } from 'react';
import styles from './welcomeContent.module.css'; // Import your CSS module

function AnimationText({classNames}) {
      
      const texts = ['PDF-Reader', 'Presentation', 'ImageChat', 'Chat', 'Doc Manager', 'Text to Audio']; // Define your texts in an array
      const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 2000); // Change the delay as needed

    return () => clearTimeout(timer);
  }, [currentIndex, texts]);

  return (
    <>
      {texts.map((text, index) => (
        <span key={index} 
        className={`${styles.fade} ${index === currentIndex ? styles.fadeIn : styles.fadeOut} ${classNames}, p-2 whitespace-nowrap`}
        style={{ display: index === currentIndex ? 'inline' : 'none' }}
        
        >
      {text}</span>
      ))}
    </>
  );
}

export default AnimationText;
