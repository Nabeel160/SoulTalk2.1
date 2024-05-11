import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../../reduxStore/slice/Loginslice";
import { useNavigate } from 'react-router-dom';
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


    const logouts = async() =>
  {
      try {
          const response = await client.post(
              `/api/logout/`,
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

    useEffect(() => {
        fetchUser()
    }, [])


    return(
        <>
            {/*<div style={{marginTop: '10.7%'}}>
            <div style={{display: 'inline'}}>
            <p style = {{fontSize: '20px', fontWeight: '5px'}}>First Name: {User ? User.first_name : ''} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last Name: {User ? User.last_name : ''}</p>
            <p style = {{fontSize: '20px', fontWeight: '5px'}}>Username: {User ? User.username : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Email: {User ? User.email : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Date of birth: {User ? User.date_of_birth : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Gender: {User ? User.gender : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Depression level: {depression}</p>

                <button className='btn btn-danger' onClick={logouts}>log Out</button>

            </div>
            </div>*/}
 <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="h-100">
          <MDBCol lg="8" className="mb-4 mb-lg-0">
            <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
              <MDBRow className="g-0">
                <MDBCol md="4" className="gradient-custom text-center text-white"
                  style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                  <MDBTypography tag="h5">{`${User?User.first_name:""} ${User?User.last_name:""}`}</MDBTypography>
                  <MDBCardText>{User?User.username:""}</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
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
                        <MDBTypography tag="h6">Depression Level</MDBTypography>
                        <MDBCardText className="text-muted text-center mx-auto">{depression}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
<button className='btn btn-danger mb-5 mt-3' onClick={logouts}>log Out</button>

                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

     {User?User.favorite.map((favorites: any, index:any) => (

             <h1 key={favorites.id}><Link to={`/Psychologist/PsychologistDetail/${favorites.id}`}>{favorites.first_name}</Link></h1>

     )):""}
    </section>
            </>
    )
}

export default UserProfile;