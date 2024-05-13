import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../../reduxStore/slice/Loginslice";
import { useNavigate } from 'react-router-dom';
import bg from "../../assets/images/bg1.jpg"
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import "../../styles/UserProfile.css"

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




function UserProfile() {
    const isLoggedIn: any = useSelector((state:any) => state.login.isLoggedIn);
    const dispatch=useDispatch()
    const [User, setUser] = useState<any>();
    const [errorMessage,setErrorMessage]=useState("");
    const navigate = useNavigate();
    const [depression, setDepression] = useState('');
    const checkLogin = useSelector((state: any) => state?.login.isLoggedIn)


    const logouts = async() =>
  {
      try {
          const response = await client.post(
              '/api/logout/',
          )
          dispatch(logout() as any)
          navigate('/')
      }catch (error){
          setErrorMessage("Error occured while logout!")
      }

  }



    const fetchUser = async () => {
        try{
            let response = await client.get('api/userview/')
            const user = await response.data.user
            setUser(user)
            console.log("User: ", response.data.user.username)



      if(response.data.user.score <= 4){
          setDepression('None')
      }else if(response.data.user.score <= 9){
          setDepression('Mild')
      }else if(response.data.user.score <= 14){
          setDepression('Moderate')
      }else if(response.data.user.score <= 19){
          setDepression('Moderately Severe')
      }else if(response.data.user.score <=30){
          setDepression('Severe')
      }

        }catch(error){
            console.log(error)
            dispatch(logout())
            navigate('/')
        }
    }

    const UpdateProfile = () => {
        navigate('/UpdateProfile')
    }
    const ChangePassword = () => {
        navigate('/ChangePassword')
    }

    useEffect(() => {
        if(!checkLogin){
      navigate('/logIn')
      alert('Kindly login to access all pages')
    }
        fetchUser()
    }, [])

    const chat = (userId: any) => {
        navigate(`/chat/${User.doctor[0].id}${userId}`)
    }

    const GoToProfile = () =>{
        navigate(`/Psychologist/PsychologistDetail/${User.doctor[0].id}`)
    }

    return(
        <>

 <section className="vh-100" style={{ backgroundImage:`url(${bg})` }}>
      <MDBContainer className="mt-2 h-100">
        <MDBRow className="h-100">
          <MDBCol lg="10" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px'}} fluid />
                  <MDBTypography tag="h5">{`${User?User.first_name:""} ${User?User.last_name:""}`}</MDBTypography>
                  <MDBCardText>{User?User.username:""}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" style={{fontSize: '30px', cursor: 'pointer' }}  onClick={UpdateProfile} />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4 d-flex flex-column">
                    <MDBTypography className="text-center" tag="h4"><strong>Information</strong></MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1 d-flex flex-column">
                      <MDBCol size="12" className="mb-3 d-flex flex-row">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted text-center mx-auto">{User?User.email:""}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="12" className="mb-3 d-flex flex-row">
                        <MDBTypography tag="h6">Data Of Birth</MDBTypography>
                        <MDBCardText className="text-muted text-center mx-auto">{User?User.date_of_birth:""}</MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <MDBRow className="pt-1 d-flex flex-column">
                      <MDBCol size="12" className="mb-3 d-flex flex-row">
                        <MDBTypography tag="h6">Gender</MDBTypography>
                        <MDBCardText className="text-muted text-center mx-auto">{User?User.gender:""}</MDBCardText>
                      </MDBCol>
                      <MDBCol size="10" className="mb-3 d-flex flex-row">

                          {User && (
                             <>
                             <MDBTypography tag="h6">Depression Level</MDBTypography>
                                 <MDBCardText className="text-muted text-center mx-auto">{depression}</MDBCardText>
                                </>
                                )}
                      </MDBCol>
                    </MDBRow>
                      <button className='btn btn-success ' onClick={ChangePassword}>Change Password</button>
                      <br/>
                      {User && User.is_doctor && (
                          <button className='btn btn-primary ' onClick={GoToProfile}>Go to Profle</button>
                      )}
                      <button className='btn btn-danger mb-5 mt-3' onClick={logouts}>log Out</button>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


     {User && !User.is_doctor ?User.favorite.map((favorites: any, index:any) => (

             <h1 key={favorites.id}><Link to={`/Psychologist/PsychologistDetail/${favorites.id}`}>{favorites.first_name}</Link></h1>

     )):""}

     {User && User.is_doctor ? User.doctor[0].subscribers.map((subscribers: any, index:any)=> (
         <div key={subscribers.id}>
            <h1 style={{ display: 'inline-block', marginRight: '10px' }}>{subscribers.first_name}</h1>
            <button className="btn buttons" type="button" onClick={() => chat(subscribers.id)}>Chat</button>
        </div>
     )): ""}



    </section>
            </>
    )
}

export default UserProfile;