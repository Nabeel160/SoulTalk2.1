import React, { useState,useEffect} from 'react';
import people from "../HomeComponents/Data"
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from 'react-icons/fa';

import "../../styles/Testimonial.css"
const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const {name, job, image, text} = people[index];

  const checkNumber = (number:number) => {
    if(number > people.length - 1){
      return 0;
    }
    else if(number < 0){
      return people.length - 1;
    }
    return number;
  }

  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    }) 
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    }) 
  }

  useEffect(() => {
    // Set up an interval to call myFunction every 4 seconds (2000 milliseconds)
    const intervalId = setInterval(nextPerson, 4000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return<article className="review">
    <div className="img-container">
      <img src={image} alt={name} className="person-img"/>
      <span className="quote-icon">
        <FaQuoteRight />
      </span>
      </div>
      <h4 className="author">{name}</h4>
      <p className="jon">{job}</p>
      <p className="info">{text}</p>
      <div className="button-container">
        <button className="prev-btn" onClick={prevPerson}>
          <FaChevronLeft />
        </button>
        <button className="next-btn" onClick={nextPerson}>
          <FaChevronRight />
        </button>  
      </div>
     
  </article>;
};

export default Testimonial;