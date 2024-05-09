import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


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
    <div style={{
      background: "linear-gradient(to right, #ff8a00, #da1b60)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px"
    }}>      <div style={{ textAlign: "center", marginBottom: "30px",marginTop:"5%" }}>
    <h1 style={{ color: "#fff", fontSize: "2rem", marginBottom: "20px" }}>Reviews by our precious customers</h1>
  </div>

  <div style={{ marginBottom: "20px",alignSelf:"flex-end" }}>
        <button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }} onClick={handleShow}>Add Review</button>
      </div>

      <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton style={{ backgroundColor: '#f5f5f5', color: '#333', borderBottom: '1px solid #ddd' }}>
    <Modal.Title onClick={handleShow} style={{ cursor: 'pointer' }}>Add Review</Modal.Title>
  </Modal.Header>

  <Modal.Body style={{ padding: '20px' }}>
    <form onSubmit={handleFormSubmit}>
      <label style={{ display: 'block', marginBottom: '10px' }}>
        Rating:
        <input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <label style={{ display: 'block', marginBottom: '10px' }}>
        Comment:
        <textarea
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
        />
      </label>

      <button type="submit" style={{float:"right", backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
        Submit Review
      </button>
    </form>
  </Modal.Body>


</Modal>


        <div style={{ width: "100%", maxWidth: "1200px" }}>    {reviews.map((review:any, index:any) => (
  <div className='container bg-white mb-3 mt-3 ' key={index} style={{
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)"
  }}>
   <p style={{ fontWeight: "bold", marginBottom: "10px" }}>User: {review.user ? review.user.first_name : 'Unknown User'}</p>    <p>Rating: {review.rating}</p>
    <p>Comment: {review.comment}</p>
    <p>Added On: {review.added_on}</p>
  </div>
))}
        </div>
    </div>
  )
}

export default Reviews;