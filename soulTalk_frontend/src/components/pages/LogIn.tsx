import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../styles/LogIn.css"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { useSelector, useDispatch } from 'react-redux';
import { login} from "../../reduxStore/slice/Loginslice";
import SignUp from './SignUp';


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function LogIn() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
    const [email, setEmail] = useState('');
    const [errorMessage,setErrorMessage]=useState("");
    const [password, setPassword] = useState('');
    useEffect(() => {
      client.get("/api/userview")
      .then(function(res) {
        setCurrentUser(true);
        setErrorMessage("");
      })
      .catch(function(error) {
        setCurrentUser(false);
      });
    }, []);

    const submitLogin=async (e:any)=> {
      e.preventDefault();
      try {
        const response= await client.post(
          `/api/login/`,
          {
              email: email,
              password: password
          }
      )


        // Check if the response indicates a successful login
        if (response.status === 200) {
          setCurrentUser(true);
          setEmail("");
          setPassword("");
          dispatch(login());
          navigate('/');
        } else {
          setErrorMessage('Email or password is incorrect.');
        }
      } catch (error) {
        // Handle network or other errors
        setErrorMessage('An error occurred while logging in.');
        setEmail("");
          setPassword("");
      }


  }
  return (
    <div className="loginmargin">
    <div className=" d-flex  justify-content-center align-items-center">
    <MDBContainer fluid className="p-3 my-5  ">

      <MDBRow className='d-flex  justify-content-center align-items-center'>

        <MDBCol col='2' md='6' >
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" className="img-fluid d-none d-md-block " alt="Phone image" />
        </MDBCol>

        <MDBCol col='4' md='5' style={{background:"skyblue"}}>
           <form  onSubmit={e => submitLogin(e)}>
            <h1 className='text-center '>Sign In</h1>
          <MDBInput className="form-control"  wrapperClass='mt-4 'type="email" label='Enter Email'
             name="email"
             value={email}
             required
             onChange={e => setEmail(e.target.value)}
             maxLength={254} size="lg" style={{background:"white",display:"block",minHeight:"calc(1.5em + 1rem + calc(1px * 2))",padding:"0.5rem 1rem",fontSize:"1.25rem",borderRadius:"0.5rem", width: "100%",
             fontWeight: "400",
             lineHeight: "1.5",
             zIndex:"0",
             color: "black",
             appearance: "none",
             backgroundColor: "white",
             backgroundClip: "padding-box",
             border: "1px solid #dee2e6",
             transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out"}}/>
          <MDBInput  style={{background:"white",display:"block",minHeight:"calc(1.5em + 1rem + calc(1px * 2))",padding:"0.5rem 1rem",fontSize:"1.25rem",borderRadius:"0.5rem", width: "100%",
             fontWeight: "400",
             lineHeight: "1.5",
             zIndex:"0",
             color: "black",
             appearance: "none",
             backgroundColor: "white",
             backgroundClip: "padding-box",
             border: "1px solid #dee2e6",
             transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out"}} wrapperClass='mt-4'  id='formControlLg' type="password" label='password'
             name="password"
             value={password}
             required
             onChange={e => setPassword(e.target.value)}
             maxLength={50} size="lg"  />
{errorMessage && <p>{errorMessage}</p>}

          <div className="d-flex justify-content-between mx-4 mt-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <button className="mt-4 mb-4 w-10 text-center btn btn-primary " >Sign in</button>

          </form>
          <h5>If you do not have account click on <Link to="/SignUp">Signup</Link></h5>

        </MDBCol>

      </MDBRow>

    </MDBContainer>

    </div>
    <footer id="footer">
  <div className="footer-top">
    <div className="container">
      <div className="row " style={{display:"flex"}}>
        <div className="col-lg-3 col-md-2 col-sm-6">
          <div className="footer-info">
            <h3>Soul Talk</h3>
            <p>
              Air University <br/>
              E-9, Islamabad, Pakistan<br/><br/>
              <strong>Phone:</strong> +1 5589 55488 55<br/>
              <strong>Email:</strong> info@soultalk.com<br/>
            </p>
            <p className="description">Soul Talk provides online therapy services connecting users with professional psychologists.</p>
            <div className="social-links mt-3">
              <a href="#" className="twitter"><i className="fa fa-twitter"></i></a>
              <a href="#" className="facebook"><i className="fa fa-facebook"></i></a>
              <a href="#" className="instagram"><i className="fa fa-instagram"></i></a>
              <a href="#" className="linkedin"><i className="fa fa-linkedin"></i></a>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-4 d-none d-md-block">
          <div className="footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>Subscribe to our newsletter for the latest updates and news.</p>
            <form action="#" method="post">
              <input type="email" name="email" placeholder="Enter your email"/>
              <input type="submit" value="Subscribe"/>
            </form>
          </div>
        </div>

        <div className="col-lg-3 col-md-2 col-sm-6" >
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to='/?section=home' >
            Home
            </Link></li>
              <li><Link to='/?section=about-us' >
            About-us
            </Link></li>
              <li><Link to='/?section=services' >
            Services
            </Link></li>
              <li><Link to='/?section=awareness' >
            Awareness
            </Link></li>
            <li><Link to='/?section=team' >
            Team
            </Link></li>
            <li><Link to='/?section=contactUs' >
            ContactUs
            </Link></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        <div className="credits">
          Designed by <a href="#">Friendly Developers & 128 Technologies</a>
        </div>
      </div>
    </div>
  </div>
</footer>

  </div>

  );
}



export default LogIn;