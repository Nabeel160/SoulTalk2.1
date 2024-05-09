import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectThreads } from '../../../reduxStore/slice/ForumSlice';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import imag from "../../../assets/images/download.jpeg";
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
    'X-CSRFToken': getCSRFToken(),
  },
});

const SpecificForum = () => {
  const selectThread = useSelector((state: any) => state.forum.selectedThreads);
  const [reply, setReply] = useState('');
  const [show, setShow] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState<any>(null);
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow(false);
    setSelectedReplyId(null); // Reset selected reply when closing the modal
  };

  const handleShow = (replyId: any) => {
    setShow(true);
    setSelectedReplyId(replyId); // Set the selected reply ID when opening the modal
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // Make an API request to post the reply
      await client.post(`api/submit_reply/`, {
        Post: selectThread.id,
        reply,
        parentReply: selectedReplyId ? selectedReplyId.id : null,
      });

      const updatedResponse = await axios.get(`http://127.0.0.1:8000/api/forums/${selectThread.id}/`);
      const updatedData = updatedResponse.data;

      // Update the state with the new data
      dispatch(selectThreads(updatedData));
      console.log('Review posted successfully');
      // Reset form fields after successful submission
      setReply('');
      setSelectedReplyId(null); // Reset selected reply after posting a reply
    } catch (error: any) {
      // Handle error
      console.error('Error posting reply:', error.response?.data || error.message);
    }
  };

  return (
    <div style={{
      background: "linear-gradient(to right, #ff8a00, #da1b60)",
      minHeight: "100vh",
      padding: "20px",
      color: "#fff",
      fontFamily: "'Arial', sans-serif"
    }}>
       <div style={{ textAlign: "center", marginBottom: "30px",marginTop:"5%" }}>
        <h1>{selectThread.subject}</h1>
      </div>
      <div style={{ background: "#333", padding: "20px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2>{selectThread.description}</h2>
      </div>
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }} onClick={() => handleShow(null)}>
          Add Comment
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleFormSubmit}>
            <br />
            <label>
              Reply:
              <textarea style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc", minHeight: "100px", resize: "vertical" }}maxLength={1000} value={reply} onChange={(e) => setReply(e.target.value)} required />
            </label>
            <br />
            <button  style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }} type='submit' onClick={handleClose}>
              Submit Comment
            </button>
          </form>
        </Modal.Body>

      </Modal>
      <div style={{ marginBottom: "20px" }} className='container mb-3'>
        {selectThread.replies.map((reply: any) => (

          <div className='threadreply bg-white text-black d-flex flex-row mt-4' key={reply.id} style={{
            background: "#fff",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "20px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)"
          }}>
            <img
        className='rounded-circle'
        src={imag}
        style={{
          width: "50px",
          height: "50px",
          marginRight: '10px',
          marginBottom:"3px",
          marginTop:"3px" // Space between the image and the content
        }}
      />
      <div>
            <p>User: {selectThread.user ? selectThread.user.first_name: 'Anonymous'}</p>
            <p>Date: {reply.added_on}</p>
            <h5>Reply: {reply.reply}</h5>
            <button style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "5px" }} type='button' className='btn btn-success' onClick={() => handleShow(reply)}>
              Reply
            </button>
           </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecificForum;