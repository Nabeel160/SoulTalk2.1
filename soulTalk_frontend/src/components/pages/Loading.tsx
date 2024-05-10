// Loading.js

import React, { useEffect, useState } from 'react';
import "../../styles/Loading.css";

const Loading = () => {
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    const textToType = 'SOUL TALK';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      setTypedText(textToType.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > textToType.length) {
        clearInterval(typingInterval);
      }
    }, 150); // Adjust typing speed as needed

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="spinner-head">
      <h1 className="loading-text">{typedText}</h1>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
