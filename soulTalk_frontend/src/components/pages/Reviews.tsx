import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../../styles/PsycholgistDetail.css";
import "../../styles/Review.css"
import bg from "../../assets/images/bg.png";
import download from "../../assets/images/download.jpeg"
const Reviews = () => {

    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
    axios.defaults.withCredentials = true;

    const getCSRFToken = () => {
  const csrfCookie = document.cookie.split(';').find(cookie => cookie.trim().startsWith('csrftoken='));
  return csrfCookie ? csrfCookie.split('=')[1] : null;
};

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
    withCredentials: true,
    headers: {
    'X-CSRFToken': getCSRFToken(), // Ensure you have the getCSRFToken function
  },
});

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchReviews = async() => {
      axios.get('http://127.0.0.1:8000/api/reviews/')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }



  useEffect(() => {
    // Make an API request to fetch the reviews
      fetchReviews()

      const intervalId = setInterval(fetchReviews, 3000)

      return () => clearInterval(intervalId)

  }, []);


  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    
    try {
        // Make an API request to post the rating and comment
        await client.post(`api/submit_review/`, {
          rating: parseInt(rating), // Convert rating to an integer
          comment: comment,
        });

        const response = ".."
        // Handle success, you might want to do something with the response
        console.log('Review posted successfully:', response);

        // Reset form fields after successful submission
        setRating('');
        setComment('');
      } catch (error:any) {
        // Handle error
        console.error('Error posting review:', error.response?.data || error.message);
      }
  };

  return (
<>
      <Modal show={show} onHide={handleClose} centered>
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
          <button type="submit" className="btn btn-primary" onClick={handleClose}>Submit Review</button>
        </form>
      </Modal.Body>
    </Modal>

    <header style={{backgroundImage:`url(${bg})`}} >
        <div className="containers">
            <div className="containers__left">
                <h1>Read what our customers love about us</h1>
                <p>
                    Over 200 companies firm diverse sectors consult us to enhance the
                    user experience of their products and services.
                </p>
                <p>
                    We have helped companies increase their customer base and generate
                    multifold revenue with our service.
                </p>
                <button className="btn  buttons me-md-2"  type="button"  onClick={handleShow}>Add Review</button>
            </div>
            <div className="containers__right">
                 {reviews.map((review:any, index:any) => (
                <div className="cards" key={index}>
                    <div className="d-flex flex-column">
                    <img src={download} alt="user"/>

                        </div>
                    <div className="cards__content">
                        <span>❝</span>
                        <div className="cards__details">
                            <p>
                                {review.comment}
                            </p>
                            <h4>- {review.user ? review.user.first_name : 'Unknown User'}</h4>
                            <h4>{review.added_on }</h4>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        </header>
    </>
  )
}

export default Reviews;