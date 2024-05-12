import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import '../../styles/Navbar.css';
import img from '../../assets/images/login.jpg';
import axios from 'axios';
import LogIn from '../pages/LogIn';
import '../../App.css';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../reduxStore/slice/Loginslice';
import imag from '../../assets/images/download.jpeg';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

const client = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCSRFToken(), // Ensure you have the getCSRFToken function
  },
});

function Navbar() {
  const logouts = async () => {
    try {
      const response = await client.post(`/api/logout/`);
      dispatch(logout() as any);
    } catch (error) {
      setErrorMessage('Error occured while logout!');
    }
  };
  const isLoggedIn: any = useSelector((state: any) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [admin, setAdmin] = useState(false);

  const checkAdmin = async () => {
    let response = await client.get('/api/userview/');
    setAdmin(response.data.is_staff);
    console.log('It is admin:  ', response.data.is_staff);
  };

  useEffect(() => {

    client
      .get('/api/userview')
      .then(function (res) {
        setCurrentUser(true);
        setErrorMessage('');
        dispatch(login() as any)
      })
      .catch(function (error) {
        setCurrentUser(false);
        dispatch(logout() as any)
      });
  }, []);

  const popafterdelay = () => {
    // Hide the popup after a 2-second delay
    setTimeout(() => {
      closeModal();
    }, 2000); // Delay in milliseconds (2000ms = 2 seconds)
  };

  const submitLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await client.post(`/api/login/`, {
        email: email,
        password: password
      });

      // Check if the response indicates a successful login
      if (response.status === 200) {
        setCurrentUser(true);
        setEmail('');
        setPassword('');
        navigate('/');
        popafterdelay();
      } else {
        setErrorMessage('Email or password is incorrect.');
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('An error occurred while logging in.');
    }
  };

    const [click, setClick] = useState(false);
    const [show, setShow] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu=()=> setClick(false);

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef(null);


  const openModal = () => {
    setShowModal(true);
  };

  function userProf() {
      navigate('/UserProfile')
    }

  const closeModal = () => {
    setShowModal(false);
  };
  const handleBackdropClick = (e:any) => {
    if (modalRef.current && e.target === modalRef.current) {
      closeModal(); // Close the modal if the click is outside of the modal content
    }
  };

  return (
    <>

     <nav className='navbar fixed-top ' >
        <Link to='/?section=home' className='navbar-logo' onClick={closeMobileMenu}>
          SoulTalk
        </Link>

        <div className={`modal ${showModal ? 'show' : ''}`}  role="dialog" style={{background: "rgba(0, 0, 0, 0.6)",zIndex:"10000000000", display: showModal ? 'block' : 'none' }} onClick={handleBackdropClick}
    ref={modalRef}>
    <div className="modal-dialog" style={{ marginTop: "8%" , marginLeft: '22%'}}>
      <div className="modal-content" style={{background: "cyan", height:"50%",width:"60vw"}}>
        <div className="modal-body" style={{padding:"0"}} >
         <div className='container-fluid'>
         <div className='row'>
          <div className='col-sm-5' style={{padding:"0px"}}>
          <img src={img} style={{height:"25.9rem", borderTopLeftRadius:"7px", borderBottomLeftRadius:"7px"}} className='img-fluid d-none d-lg-block'/>
         </div>
         <div className='col-sm-7  d-flex flex-column  '>
             <h2 className='px-3 py-4 align-self-center font-weight-bolder '>Sign In</h2>
          <form  onSubmit={e => submitLogin(e)}>
            <input style={{width:"100%"}} className='rounded-4 px-1 mb-3   ' type="email" placeholder='Enter Email'
             name="email"
             value={email}
             required
             onChange={e => setEmail(e.target.value)}
             maxLength={254}
            />

            <input style={{width:"100%"}} className='rounded-4 px-1  ' type="password" placeholder='password'
             name="password"
             value={password}
             required
             onChange={e => setPassword(e.target.value)}
             maxLength={50}
            />
            <button style={{width:"100%"}} className='rounded-4 px-1 mt-3 ' type="submit">Sign In</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
          <h6 className='align-self-center  mt-3  '>If you do not have an account click on <br/><span className="text-center text-success "><strong >Sign Up</strong></span></h6>
                 </div>
         </div>
         </div>
        </div>
      </div>
    </div>
  </div>

        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click?'nav-menu active':'nav-menu'}>
          <li className='nav-item'>
           <Link to='/?section=home' className='nav-links' onClick={closeMobileMenu}>
            Home
            </Link>
          </li>
          <li className='nav-item'
         ><Link to='/?section=about-us' className='nav-links' onClick={closeMobileMenu}>About</Link>
          </li>
          <li className='nav-item'
         ><Link to='/?section=services' className='nav-links' onClick={closeMobileMenu}>Services</Link>
          </li>
          <li className='nav-item'
         ><Link to='/?section=awareness' className='nav-links' onClick={closeMobileMenu}>Awareness</Link>
          </li>
          <li className='nav-item'
         ><Link to='/?section=team' className='nav-links' onClick={closeMobileMenu}>Team</Link>
          </li>
          <li className='nav-item'>
           <Link to='/?section=contactUs' className='nav-links' onClick={closeMobileMenu}>
            Contact
            </Link>
          </li>
          <li className='nav-item dropdown' >
            <li className='nav-links dropdown-toggle id="dropdownMenuButton" data-mdb-toggle="dropdown"aria-expanded="true"'>
              More
            </li>
            <ul className="dropdown-menu bg-info" aria-labelledby="dropdownMenuButton">
    <li className="dropdowns-items"><Link className="dropdown-item "  to="/Psychologist/psychologistList">Psychologist</Link></li>
    <li className="dropdowns-items"><Link className="dropdown-item"  to="/Reviews">Reviews</Link></li>
    <li className="dropdowns-items"><Link className="dropdown-item"    to="/Forum/Forums">Forums</Link></li>
   <li className="dropdowns-items"><Link className="dropdown-item"    to="/chat/public">Chat Toom</Link></li>

            </ul>
          </li>

      <Accordion defaultActiveKey="0" className="d-lg-none more-dropdown mt-1" style={{ color: 'red', /* add other styles */ }}>
  <Accordion.Item eventKey="0">
    <Accordion.Header className="accordion-header" style={{ /* add other styles */ }}>More</Accordion.Header>
    <Accordion.Body>
      <Link to="/Psychologist/psychologistList" style={{ textDecoration: 'none', color: 'green' }}>Psychologist</Link>
    </Accordion.Body>
    <Accordion.Body>
      <Link to="/Reviews" style={{ textDecoration: 'none', color: 'orange' }}>Reviews</Link>
    </Accordion.Body>
    <Accordion.Body>
      <Link to="/Forum/Forums" style={{ textDecoration: 'none', color: 'purple' }}>Forums</Link>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
         <li className='nav-item'>
          {isLoggedIn ? (
        <h4 className='nav-links-mobile '>Hey user!</h4>
      ) : (
        <Link to='/LogIn' className='nav-links-mobile ' onClick={() => { closeMobileMenu();}}>
            LogIn
            </Link>
      )}

          </li>
          <li className='nav-item'>
          {isLoggedIn ? (
        <img className='picture-links rounded-circle' src={imag} style={{width:"70px",height:"50px",}} alt="User Image" onClick={userProf}/>
      ) : (
        <Link to='/LogIn' className='login-links ' onClick={() => { closeMobileMenu();}}>
        Login
        </Link>
      )}

          </li>

        </ul>
        </nav>

           </>
  )
}

export default Navbar