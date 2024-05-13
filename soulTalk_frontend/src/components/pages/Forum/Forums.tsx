import React, { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setThreads,selectThreads } from '../../../reduxStore/slice/ForumSlice';
import { login } from "../../../reduxStore/slice/Loginslice"
import { Link } from 'react-router-dom';
import imag from "../../../assets/images/download.jpeg";
import bg from "../../../assets/images/bg1.jpg"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import "../../../styles/Forum.css"


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

const Forums = () => {
    const forums: any = useSelector((state:any) => state?.forum?.threads);
    const checkLogin = useSelector((state: any) => state?.login.isLoggedIn)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/forums/');
        const data = response.data;
        dispatch(setThreads(data as any))
        console.log("DATA FETCHED" + data)
    }catch(e){}
    }
    useEffect(() => {
      // Fetch data initially
        if(!checkLogin){
      navigate('/logIn')
      alert('Kindly login to access all pages')
    }

      // Fetch data every second
       setInterval(() => {
        fetchData();
      }, 1000);


    }, [dispatch]);
  const handleThreadsClick = (threads:any) => {

    dispatch(selectThreads(threads));
  };
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const handleFormSubmit = async (e:any) => {
  e.preventDefault();

  try {
        // Make an API request to post the rating and comment
        await client.post(`api/submit_thread/`, {
          subject: subject, // Convert rating to an integer
          description: description,
        });



        // Reset form fields after successful submission
        setSubject('');
        setDescription('');
      } catch (error:any) {
        // Handle error
        console.error('Error posting thread:', error.response?.data || error.message);
      }
}


  return (
    <div className="header" style={{ backgroundImage:`url(${bg})`, height: "100vh",margin:"0px",padding:"0px" }}>
    <div className='forums-header d-flex justify-content-center mt-5'>
    <h1>Forums</h1>
  </div><div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-primary me-md-2" type="button" onClick={handleShow}>Add Thread</button>
</div>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title onClick={handleShow}>Add Thread</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleFormSubmit}>
        <label>
          Subject:
          <textarea
         style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}   maxLength={1000}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </label>
          <br />
          <label>
          Description:
          <textarea
          style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
          maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
          <br />
          <button type="submit" style={{float:"right", backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
        Submit Thread
      </button>
        </form>
        </Modal.Body>

      </Modal>
      <div className='mt-3 '>
  {forums.map((forum:any) => (
    <div
      className='container-fluid d-flex flex-row bg-dark-subtle '
      key={forum.id}
      style={{
        borderBottom: '1px solid #e0e0e0', // Add a bottom border for separation
       width:"100vw"
      }}
    >
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
        <Link
          to={`/Forum/SpecificForum/${forum.id}`}
          onClick={() => handleThreadsClick(forum)}
          style={{
            textDecoration: 'none',
            color: 'green',
            fontWeight: 'bold', // Changed to bold for better visibility
            display: 'block', // Make it a block element to prevent inline layout issues
             // Space between subject and addedon
          }}
        >
          {forum.subject}
        </Link>
        <Link
          to={`/Forum/SpecificForum/${forum.id}`}
          onClick={() => handleThreadsClick(forum)}
          style={{
            textDecoration: 'none',
            color: 'red',
            fontSize:"50%",
            display: 'block' // Make it a block element
          }}
        >
          {forum.added_on}
        </Link>

      </div>
      <Link
          to={`/Forum/SpecificForum/${forum.id}`}
          onClick={() => handleThreadsClick(forum)}
          style={{
            textDecoration: 'none',
            color: 'red',
            marginLeft:"auto",
            marginRight:"10px"
          }}
        >
          {forum.user?forum.user.first_name:"anonymous"}
        </Link>
        <img
        className='rounded-circle'
        src={imag}
        style={{
          width: "30px",
          height: "30px",
          marginRight: '10px',
          marginBottom:"3px",
          marginTop:"3px" // Space between the image and the content
        }}
      />
    </div>

  ))}
</div>

  </div>
  )
}

export default Forums