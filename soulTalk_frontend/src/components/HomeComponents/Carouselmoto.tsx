import carousel1 from "../../assets/images/Carousel/carousel1.jpg"
import carousel2 from "../../assets/images/Carousel/carousel2.jpg"
import carousel3 from "../../assets/images/Carousel/carousel3.jpg"
import React from 'react';
import "../../styles/Home.css"
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';

export default function Carouselmoto() {
  return (
    <MDBCarousel className="carouselitem" showIndicators   fade interval={2000}>
      <MDBCarouselItem
      style={{width:"100vw",height:"80vh"}}
        itemId={1}
        src={carousel1}
        alt='...'
      >
        <h5>First slide label</h5>

      </MDBCarouselItem>

      <MDBCarouselItem
        style={{width:"100vw",height:"80vh"}}
        itemId={2}
        src={carousel2}
        alt='...'
      >
        <h5>Second slide label</h5>

      </MDBCarouselItem>

      <MDBCarouselItem
       style={{width:"100vw",height:"80vh"}}
        itemId={3}
        src={carousel3}
        alt='...'
      >
        <h5>Third slide label</h5>

      </MDBCarouselItem>
    </MDBCarousel>
  );
}