import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {VideoRoom} from "./VideoRoom";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useParams} from "react-router-dom";
import {API_URL} from "../../../Config";



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
    const selectedPsychologist = useSelector((state:any) => state.psychologists.selectedPsychologist);
    // State to track whether the component is open or closed
  const [isComponentOpen, setComponentOpen] = useState(false);

  // Function to handle button click and toggle the state

    const [joined, setJoined] = useState(false)
    const [isFavorite, setIsFavorite] = useState<boolean | null>(null)
    const [data, setData] = useState<any>()
    const { doctor_id } = useParams();
    const [doc, setDoc] = useState<DoctorType>({
        id: selectedPsychologist.id,
        first_name: selectedPsychologist.first_name,
        image: selectedPsychologist.image,
        price: "5"
    });



    const fetchUser = async () => {
        try{
            const response = await client.get("/api/userview/");

            const favorites = response.data.user.favorite || [];
            favorites.forEach((favorite: any) => {
      if (favorite.id === selectedPsychologist.id) {
        setIsFavorite(true)
      }
    });

        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {

        console.log("USE EFFECT WORKIN")
        fetchUser()
    })


    const getDoctor = async () => {
        try {
            console.log("Running?")
            const response = await fetch(`http://127.0.0.1:8000/api/doctors/${selectedPsychologist.id}/`, {
                credentials: 'include',
            });
            console.log("Running?")
                console.log("Running?")
                const data: DoctorType = await response.json();
                setDoc(data);
                console.log(doc.id)

        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };


    const handleAddFavorite = async () => {
        try{
            const response = await client.post('api/add_favorite/', {
                doctorId: selectedPsychologist.id
            })
            fetchUser()
        }catch(error){
            console.log(error)
        }
    }

    const handleRemoveFavorite = async () => {
        try{
            const response = await client.post('api/remove_favorite/', {
                doctorId: selectedPsychologist.id
            })
            setIsFavorite(false)
            fetchUser()
        }catch(error){
            console.log(error)
        }
    }



    let handleSub = async () => {
        let room = selectedPsychologist.id
        let response = await fetch(`http://127.0.0.1:8000/get_token/?channel=${room}`)
        let data = await response.json()

        let UID = data.uid
        let token = data.token

        sessionStorage.setItem('UID', UID)
        sessionStorage.setItem('token', token)
        sessionStorage.setItem('room', room)

        window.open('/VideoRoom', '_self')

    }


    const handleButtonClick = () => {
    setComponentOpen(!isComponentOpen);

  };

    let handleClick = () => {
        setJoined(true);
        handleSub();
    }
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFormSubmit = async (e:any) => {
    e.preventDefault();
    try {
        // Make an API request to post the rating and comment
        await client.post(`api/submit_docReview/`, {
          rating: parseInt(rating), // Convert rating to an integer
          comment,
            doctors: selectedPsychologist.id
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
  }

  const handleCheckout = async () => {

            const csrfToken = getCSRFToken();
            if (!csrfToken) {
                console.error('CSRF token not found');
                return;
            }
            const response = await fetch(`${API_URL}/api/doctors/create-checkout-session/${selectedPsychologist.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken // Include CSRF token in request headers
                },
                credentials: 'include',
                // Add any request body data if needed
                // body: JSON.stringify({ /* Add data here */ }),
            });
            if (response.ok) {
                // Handle successful checkout
                console.log('Checkout successful');
               const responseData = await response.json();
                console.log('Checkout session URL:', responseData.checkout_url);
               window.location.href = responseData.checkout_url;
            } else {
                // Handle error response
                console.error('Error during checkout:', response.statusText);
            }

    };




  return (
    <div className='stylings'>
        <div className="container" >
        <div className=" row">
            <div className='col-md-8 mt-5'>
                <h2><strong>Name:</strong> { selectedPsychologist.first_name } { selectedPsychologist.last_name }</h2>
                <h2><strong>Age:</strong> { selectedPsychologist.age }</h2>
                <h2><strong>Email:</strong> { selectedPsychologist.user.email }</h2>
                <h2><strong>Qualfication:</strong> { selectedPsychologist.qualification }</h2>
            </div>
            <div className="picsandcall col-md-4 d-flex flex-column mr-0">
            <img src={selectedPsychologist.image}/>
            <button className="btn btn-primary me-md-2" type="button" onClick={handleClick}>Join Room</button>
            <br/>
                {isFavorite ? (
                <button className="btn btn-primary me-md-2" type="button" onClick={handleRemoveFavorite}>Already Favorite</button>
                    ) : (<button className="btn btn-primary me-md-2" type="button" onClick={handleAddFavorite}>Add to Favorite</button>)}
                <br/>
            <button className="btn btn-primary me-md-2" type="button" onClick={handleCheckout} >Subscribe</button>

    </div>

            <hr/>
            <h3>&nbsp;&nbsp;Reviews</h3><br/>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
  <button className="btn btn-primary me-md-2" type="button" onClick={handleShow}>Add Review</button>
</div>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title onClick={handleShow}>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          <br />
          <button type="submit">Submit Review</button>
        </form>
        </Modal.Body>

      </Modal>
            <div className="container-fluid revi mb-2" style={{maxHeight: "35vh",overflowY:"scroll",marginBottom:"22%"}}>
                        {selectedPsychologist.reviews.map((review:any,index:any) =>(
                           <div className="doctreview">
                            <h5>user_name:{selectedPsychologist.user.first_name}</h5>
                            <h5>Date:{review.added_on}</h5>
                        <h5>Rating: { review.rating }</h5>
                        <h5>Comment: {review.comment }</h5>
                    </div>

                        ))}
                                             <br/>
    </div></div></div>

    <footer id="footer" style={{marginBottom:"2px"}}>
    <div className="footer-top">
      <div className="container">
        <div className="row">

          <div className="col-lg-3 col-md-6">
            <div className="footer-info">
              <h3>Soul Talk</h3>
              <p>
                Air University <br/>
                E-9, Islamabad, Pakistan<br/><br/>
                <strong>Phone:</strong> +1 5589 55488 55<br/>
                <strong>Email:</strong> info@example.com<br/>
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
              <input type="email" name="email"/><input type="submit" value="Subscribe"/>
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
  )
}

export default PsychologistDetail