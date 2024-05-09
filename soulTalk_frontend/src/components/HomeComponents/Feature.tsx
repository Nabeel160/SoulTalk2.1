import React, { useState, useEffect } from 'react';
import feature1 from "../../assets/images/features-1.png"
import feature2 from "../../assets/images/features-2.png"
import feature3 from "../../assets/images/features-3.png"
import feature4 from "../../assets/images/features-4.png"
import "../../styles/Home.css"
import 'boxicons/css/boxicons.min.css';
function Feature() {
  const [selectedImage, setSelectedImage] = useState(feature1); // Default image on page load
  const [activeButton, setActiveButton] = useState<number|null>(1); // Default on button on page load

  // Function to change the selected image and on button
  const handleButtonClick = (imagePath:string, buttonIndex:number) => {
    setSelectedImage(imagePath);
    setActiveButton(buttonIndex);
  };

  useEffect(() => {
    // Set initial image and on button when the component mounts
    handleButtonClick(feature1, 1);
  }, []);

  return (
    <>
   
  <div className="container">

<div className="row">
  <div className="col-lg-6 mb-5 mb-lg-0" >
    <ul className=" d-flex flex-column ">
      <li className={`features-items${activeButton === 1 ? 'on' : ''}`}   onClick={() => handleButtonClick(feature1, 1)}>
     <div className="activeFeature" >
      
          <h4>Feeling Depressed</h4>
          <p>You look happy but you do not feel happy. That's what depression does to you?</p>
  </div>
      </li>
      <li className={`features-items${activeButton === 2 ? 'on' : ''}`}  onClick={() => handleButtonClick(feature2, 2)}>
        <div className="activeFeature">
          <h4>Feeling Lonely</h4>
          <p>A big part of depression is feeling lonely even if you are in a room of a million people.</p>
        </div>
      </li>
      <li className={`features-items${activeButton === 3 ? 'on' : ''}`} onClick={() => handleButtonClick(feature3, 3)}>
        <div className="activeFeature">
          <h4>Feeling Stress</h4>
          <p>When I look back on all these worries, I remember the story of old man to said on his death bed that he had a lot of trouble in his life most of which never happened.</p>
        </div>
      </li>
      <li className={`features-items${activeButton === 4 ? 'on' : ''}`}  onClick={() => handleButtonClick(feature4, 4)}>
        <div className="activeFeature">

          <h4>Feeling Overwhelmed</h4>
          <p>Some days you feel like ocean, some days you feel like you are drowning in it.</p>
        </div>
      </li>
    </ul>
  </div>
  <div className="col-lg-6 mr-sm-2" data-aos="fade-left">
  <img src={selectedImage} className="img-fluid " alt="Selected Image" />
</div>

</div>
</div>
  </>
  );
}

export default Feature;