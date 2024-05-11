import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { parseISO } from 'date-fns';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBInputGroup,
} from 'mdb-react-ui-kit';
import img from "../../assets/images/img-6.jpg"
import "../../styles/LogIn.css"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "../../reduxStore/slice/Loginslice";
import { setData } from "../../reduxStore/slice/RegistrationSlice";

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
    'X-CSRFToken': getCSRFToken(),
  },
});

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [selectedDate, setSelectedDate] = useState<string | Date | null>('');
  const [doctor, setDoctor] = useState<boolean | null>(null);
  const [formCompleted, setFormCompleted] = useState(false); // State to track form completion
  const [passwordMatch, setPasswordMatch] = useState(false); // State to track password match
  const datePickerRef = useRef<DatePicker>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isLoggedIn: any = useSelector((state: any) => state.login.isLoggedIn);
  const dispatch = useDispatch()
 const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState(false);

  // Check if the domain part of the email is being typed correctly
  useEffect(() => {
    if(isLoggedIn){
      navigate('/UserProfile')
    }
    const domain = email.split('@')[1];
    const gmailDomain = 'gmail.com';
    if (!domain) {
      setEmailError(false);
    } else {
      for (let i = 0; i < domain.length; i++) {
        if (domain[i] !== gmailDomain[i]) {
          setEmailError(true);
          return;
        }
      }
      setEmailError(false);
    }

  }, [email]);

  useEffect(() => {
    if (
      username.trim() !== '' &&
      firstname.trim() !== '' &&
      lastname.trim() !== '' &&
      email.trim() !== '' &&
      password.trim().length >= 8 &&
      password === confirmPassword && // Check if passwords match
      gender.trim() !== '' &&
      selectedDate !== null &&
      doctor !== null
    ) {
      setFormCompleted(true);
    } else {
      setFormCompleted(false);
    }
  }, [username, firstname, lastname, email, password, confirmPassword, gender, selectedDate, doctor]);

  // Check if passwords match
  useEffect(() => {
    if (password === confirmPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [password, confirmPassword]);
  const handleInputClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  const handleQuestionaire = async (e: any) => {
    const formattedDate = typeof selectedDate === 'string' ? selectedDate : selectedDate instanceof Date ? selectedDate.toISOString().split('T')[0] : '';
    e.preventDefault()
    dispatch(setData({
      username: username,
      first_name: firstname,
      last_name: lastname,
      gender: gender,
      email: email,
      password: password,
      date_of_birth: formattedDate,
      doctor: false,
    }))
    navigate("/questionaire")
  }

  const handleformsubmit = async (e: any) => {
    e.preventDefault()

    try {
      const formattedDate = typeof selectedDate === 'string' ? selectedDate : selectedDate instanceof Date ? selectedDate.toISOString().split('T')[0] : '';
      console.log("DATE IS SAVEDDD" + formattedDate + " " + doctor)

      let response = await client.post('api/register/', {
        username: username,
        first_name: firstname,
        last_name: lastname,
        gender: gender,
        email: email,
        password: password,
        date_of_birth: formattedDate,
        is_doctor: doctor,
      });

      if (response.status >= 200 && response.status < 300) {
        await client.post('api/login/', {
          email: email,
          password: password
        })
        dispatch(login() as any)
        navigate("/");
      }

    } catch (error: any) {
      console.log(error)
    }
  }

  return (
   <div className="loginmargin" style={{ marginTop: "4.7%" }}>
      <MDBContainer fluid className='bg-dark signupcontainer' >

        <MDBRow className='d-flex justify-content-center align-items-center '>
          <MDBCol >

            <MDBCard  className='signupcard my-4' style={{height:"180vh"}}>

              <MDBRow className='g-0' >

                <MDBCol md='6' className="d-none d-md-block">
                  <MDBCardImage style={{ marginTop: "4.7%", marginLeft: "1%", width: "130%" }} src={img} alt="Sample photo" className="rounded-start signupimage" fluid />
                </MDBCol>

                <MDBCol md='6' >

                  <MDBCardBody className='text-black d-flex flex-column '>
                    <h3 className="mb-5 text-uppercase text-center fw-bold">Soul_Talk registration form</h3>
                    <form onSubmit={e => handleformsubmit(e)}>
                      <MDBRow>
                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-4' label='First Name' name='first_name' value={firstname} onChange={e => setFirstname(e.target.value)} size='lg' id='form1' type='text' required />
                        </MDBCol>
                        <MDBCol md='6'>
                          <MDBInput wrapperClass='mb-4' label='Last Name' name='last_name' value={lastname} onChange={e => setLastname(e.target.value)} size='lg' id='form2' type='text' required/>
                        </MDBCol>
                      </MDBRow>
                      <MDBInput wrapperClass='mb-4' label='User Name' name='username' value={username} onChange={e => setUsername(e.target.value)} size='lg' id='form3' type='text' required/>
                      <MDBInputGroup>
                        <MDBInput
                          wrapperClass='mb-4'
                          label='Date of Birth'
                          size='lg'
                          id='dateOfBirth'
                          type='text'
                          value={selectedDate ? (selectedDate as Date).toLocaleDateString('en-GB') : ''}
                          onClick={handleInputClick}
                          required
                        >
                          <DatePicker
                            selected={selectedDate as Date}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd-MM-yyyy"
                            className="d-none"
                            showYearDropdown
                            yearDropdownItemNumber={15} // You can adjust the number of years displayed
                            scrollableYearDropdown
                            ref={datePickerRef}
                            onClickOutside={() => {
                              if (inputRef.current) {
                                inputRef.current.focus();
                              }
                            }}
                          />
                        </MDBInput>
                        <input ref={inputRef} style={{ display: 'none' }} />
                      </MDBInputGroup>
                        <MDBInput wrapperClass='mb-4' label='Email' name='email' value={email} onChange={e => setEmail(e.target.value)} size='lg' id='form4' type='text' required />
                      {emailError && email.length > 0 && <div className="text-danger mb-4">Please enter a valid Gmail address.</div>}
                      <MDBInput wrapperClass='mb-4' label='Password' name='password' value={password} onChange={e => setPassword(e.target.value)} size='lg' id='form6' type='password' minLength={8} required />
                      <MDBInput wrapperClass='mb-4' label="Confirm Password" size="lg" id="form7" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                      {!passwordMatch && <div className="text-danger mb-4">Passwords do not match.</div>}     <div className='d-md-flex justify-content-start align-items-center mb-4'>
                        <h6 className="fw-bold mb-0 me-4">Gender:</h6>
                        <div>
                          <MDBRadio name='gender' id='male' value='Male' label='Male' inline checked={gender === 'M'} onChange={() => setGender('M')} />
                          <MDBRadio name='gender' id='female' value='Female' label='Female' inline checked={gender === 'F'} onChange={() => setGender('F')} />
                        </div>
                      </div>
                      <div className='d-md-flex justify-content-start align-items-center mb-4'>
                        <div>
                          <MDBRadio name='Doctor' id='Doctor' value='Doctor' label='Doctor' inline checked={doctor === true} onChange={() => setDoctor(true)} />
                          <MDBRadio name='User' id='User' value='User' label='User' inline checked={doctor === false} onChange={() => setDoctor(false)} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between pt-3">
                        <MDBBtn color='primary' size='lg'>Reset all</MDBBtn>
                        {doctor ? (
                          <MDBBtn
                            className='ms-2'
                            color='info'
                            size='lg'
                            type='submit'
                            disabled={!formCompleted || !passwordMatch} // Disable button if form is not completed or passwords don't match
                          >
                            Submit form
                          </MDBBtn>
                        ) : (
                          <MDBBtn
                            className='ms-2'
                            color='info'
                            size='lg'
                            onClick={handleQuestionaire}
                            disabled={!formCompleted || !passwordMatch} // Disable button if form is not completed or passwords don't match
                          >
                            Submit form
                          </MDBBtn>
                        )}
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default SignUp;