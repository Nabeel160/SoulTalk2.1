import React from 'react';
import {useState,useEffect} from "react";
import Loading from "../src/components/pages/Loading"
import Navbar from './components/nav_components/Navbar';
import './App.css';
import Home from './components/pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/pages/Products'
import ContactUs from './components/pages/ContactUs';
import LogIn from './components/pages/LogIn';
import Marketing from './components/pages/Marketing';
import PsychologistDetail from './components/pages/Psychologist/PsychologistDetail';
import PsychologistList from './components/pages/Psychologist/PsychologistList';
import SignUp from './components/pages/SignUp';
import PsychologistRoom from "./components/pages/Psychologist/PsychologistRoom";
import {VideoRoom} from "./components/pages/Psychologist/VideoRoom";
import Reviews from './components/pages/Reviews';
import Forums from './components/pages/Forum/Forums';
import SpecificForum from './components/pages/Forum/SpecificForum';
import Chatroom from './components/pages/Chatroom'
import UserProfile from './components/pages/UserProfile'
import Questionaire from './components/pages/Questionaire'
import Product from "../src/components/pages/Payment/Product"
import Message from "../src/components/pages/Payment/Message"
import Checkout from "../src/components/pages/Payment/Checkout"
import UpdateProfile from "../src/components/pages/UpdateProfile"

function App():JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate website loading delay (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Change the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);
  return (
    <><div>
      {isLoading?<Loading/>:
    <Router>
      <Navbar />
      <Routes>
        <Route path='/'  Component={Home} />
        <Route path='/products' Component={Products} />
        <Route path='/ContactUs' Component={ContactUs} />
        <Route path='/LogIn' Component={LogIn} />
        <Route path='/marketing' Component={Marketing} />
        <Route path='/Psychologist/PsychologistList' Component={PsychologistList} />
        <Route path= 'Psychologist/PsychologistDetail/:id' Component={PsychologistDetail}/>
        <Route path="/Signup" Component={SignUp}/>
        <Route path="Psychologist/PsychologistRoom" Component={PsychologistRoom} />
        <Route path="/VideoRoom" Component={VideoRoom} />
        <Route path="/Reviews" Component={Reviews}/>
        <Route path="/Forum/Forums" Component={Forums}/>
        <Route path="Forum/SpecificForum/:id" Component={SpecificForum}/>
        <Route path="/chat/:channel_name" element={<Chatroom/>} />
        <Route path="/UserProfile" Component={UserProfile} />
        <Route path="/Questionaire" Component={Questionaire} />
         <Route  path='payments/success' element={<Message/>}/>
          <Route  path="payments/Product/:product_id" element={<Product/>}/>
          <Route  path="payments/checkout/:prod_id" element={<Checkout/>}/>
        <Route path="/UpdateProfile" element={<UpdateProfile/>}/>
  </Routes>
    </Router>}
      </div>
       </>
  );
}

export default App;