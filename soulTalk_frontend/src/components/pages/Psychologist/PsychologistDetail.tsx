import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VideoRoom } from "./VideoRoom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { login } from '../../../reduxStore/slice/Loginslice';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../Config";
import "../../../styles/PsycholgistDetail.css";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

interface DoctorType {
  id: number;
  first_name: string;
  image: string;
  price: string;
}

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
  withCredentials: true,
  headers: {
    'X-CSRFToken': getCSRFToken(), // Ensure you have the getCSRFToken function
  },
});

const PsychologistDetail = () => {
  const selectedPsychologist = useSelector((state: any) => state.psychologists.selectedPsychologist);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [joined, setJoined] = useState(false);
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const checkLogin = useSelector((state: any) => state?.login.isLoggedIn);

  useEffect(() => {
    if (!checkLogin) {
      navigate('/logIn');
      alert('Kindly login to access all pages');
    } else {
      fetchUser();
    }
  }, [checkLogin, navigate]);

  const fetchUser = async () => {
    try {
      const response = await client.get("/api/userview/");
      setUser(response.data.user);
      const favorites = response.data.user.favorite || [];
      favorites.forEach((favorite: any) => {
        if (favorite.id === selectedPsychologist?.id) {
          setIsFavorite(true);
        }
      });
      if (response.data.user.subscribed.id === selectedPsychologist?.id) {
        setIsSubscribed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddFavorite = async () => {
    try {
      await client.post('api/add_favorite/', {
        doctorId: selectedPsychologist.id
      });
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      await client.post('api/remove_favorite/', {
        doctorId: selectedPsychologist.id
      });
      setIsFavorite(false);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSub = async () => {
    let room = `${selectedPsychologist.id} - ${user.id}`;
    let response = await fetch(`http://127.0.0.1:8000/get_token/?channel=${room}`);
    let data = await response.json();

    let UID = data.uid;
    let token = data.token;

    sessionStorage.setItem('UID', UID);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('room', room);

    window.open('/VideoRoom', '_self');
  };

  const handleButtonClick = () => {
    setJoined(true);
    handleSub();
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await client.post(`api/submit_docReview/`, {
        rating: parseInt(rating), // Convert rating to an integer
        comment,
        doctors: selectedPsychologist.id
      });
      console.log('Review posted successfully');
      setRating('');
      setComment('');
    } catch (error: any) {
      console.error('Error posting review:', error.response?.data || error.message);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await client.post('api/unsubscribe_doctor/', {
        doctor: selectedPsychologist.id
      });
      setIsSubscribed(false);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = async () => {
    const csrfToken = getCSRFToken();
    if (!csrfToken) {
      console.error('CSRF token not found');
      return;
    }

    try {
      await client.post('api/subscribe_doctor/', {
        doctor: selectedPsychologist.id
      });

      const response = await fetch(`${API_URL}/api/doctors/create-checkout-session/${selectedPsychologist.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken
        },
        credentials: 'include',
      });

      if (response.ok) {
        const responseData = await response.json();
        window.location.href = responseData.checkout_url;
      } else {
        console.error('Error during checkout:', response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chat = () => {
    navigate(`/chat/${selectedPsychologist.user.id}-${user.id}`);
  };

  if (!selectedPsychologist) {
    return <div>Loading...</div>;
  }

  return (
    <div className='stylings'>
      <div className="container">
        <div className="row">
          <div className='col-md-8 mt-5 mx-0 info align-center'>
            <form className="forms">
              <header>
                <u>DETAILS</u>
              </header>
              <label>
                <span>Name</span>
                <input placeholder={`${selectedPsychologist.first_name} ${selectedPsychologist.last_name}`} className="input" type="text" disabled />
              </label>
              <label>
                <span>Age</span>
                <input placeholder={selectedPsychologist.age} className="input" type="text" disabled />
              </label>
              <label>
                <span>Email</span>
                <input placeholder={selectedPsychologist.user.email} className="input" type="text" disabled />
              </label>
              <label>
                <span>Qualification</span>
                <input className="text-uppercase input" placeholder={selectedPsychologist.qualification} type="text" disabled />
              </label>

              {user && user.subscribed && user.subscribed?.id !== selectedPsychologist.id ? (
                <button className="btn buttons me-md-2" type="button" disabled>Subscribe</button>
              ) : (
                isSubscribed ? (
                  <button className="btn buttons me-md-2" type="button" onClick={handleUnsubscribe}>Unsubscribe</button>
                ) : (
                  <button className="btn buttons me-md-2" type="button" onClick={handleCheckout}>Subscribe</button>
                )
              )}
            </form>
          </div>
          <div className="picsandcall col-md-4 d-flex flex-column mr-0">
            <img src={selectedPsychologist.image} alt="Psychologist" />
            {user && user.subscribed?.id === selectedPsychologist.id ? (
              <button className="btn buttons me-md-2" type="button" onClick={handleButtonClick}>Join Room</button>
            ) : (
              <button className="btn buttons me-md-2" type="button" disabled>Join Room</button>
            )}
            <br />
            {isFavorite ? (
              <button className="btn buttons me-md-2" type="button" onClick={handleRemoveFavorite}>Already Favorite</button>
            ) : (
              <button className="btn buttons me-md-2" type="button" onClick={handleAddFavorite}>Add to Favorite</button>
            )}
            <br />
            {user && user.subscribed?.id === selectedPsychologist.id ? (
              <button className="btn buttons me-md-2" type="button" onClick={chat}>Chat</button>
            ) : (
              <button className="btn buttons me-md-2" type="button" disabled>Chat</button>
            )}
          </div>

          <hr />
          <h3>&nbsp;&nbsp;Reviews</h3><br />
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn buttons me-md-2" type="button" onClick={() => setShow(true)}>Add Review</button>
            <Modal show={show} onHide={() => setShow(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Review</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleFormSubmit} className="custom-form">
                  <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <input
                      id="rating"
                      type="number"
                      min={1}
                      max={5}
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea
                      id="comment"
                      maxLength={1000}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      className="form-control"
                      rows={5}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={() => setShow(false)}>Submit Review</button>
                </form>
              </Modal.Body>
            </Modal>
          </div>
          <div className="container-fluid revi mb-2" style={{ maxHeight: "35vh", overflowY: "scroll", marginBottom: "22%" }}>
            {selectedPsychologist.reviews.map((review: any, index: any) => (
              <div className="doctreview" key={index}>
                <h5>user_name: {selectedPsychologist.user.first_name}</h5>
                <h5>Date: {review.added_on}</h5>
                <h5>Rating: {review.rating}</h5>
                <h5>Comment: {review.comment}</h5>
              </div>
            ))}
            <br />
          </div>
        </div>
      </div>

      <footer id="footer" style={{ marginBottom: "2px" }}>
        <div className="footer-top">
          <div className="container">
            <div className="row">

              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <h3>Soul Talk</h3>
                  <p>
                    Air University <br />
                    E-9, Islamabad, Pakistan<br /><br />
                    <strong>Phone:</strong> +1 5589 55488 55<br />
                    <strong>Email:</strong> info@example.com<br />
                  </p>
                  <div className="social-links mt-3">
                    <p className="description">We provide you opportunity of treatment via online medium from our available doctors on pannel.</p>
                    <a href="/Psychologist/psychologistList" className="twitter"><i className="fa fa-twitter"></i></a>
                    <a href="/Psychologist/psychologistList" className="facebook"><i className="fa fa-facebook"></i></a>
                    <a href="/Psychologist/psychologistList" className="instagram"><i className="fa fa-instagram"></i></a>
                    <a href="/Psychologist/psychologistList" className="google-plus"><i className="fa fa-skype"></i></a>
                    <a href="/Psychologist/psychologistList" className="linkedin"><i className="fa fa-linkedin"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 footer-newsletter">
                <h4>Our Newsletter</h4>
                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                <form action="" method="post">
                  <input type="email" name="email" /><input type="submit" value="Subscribe" />
                </form>
              </div>

            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>128 Technologies & Friendly Developers</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
            Designed by <a href="#">Friendly Developers & 128 Technologies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PsychologistDetail;