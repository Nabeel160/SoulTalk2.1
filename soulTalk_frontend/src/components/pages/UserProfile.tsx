import React, {useState, useEffect} from 'react'
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../../reduxStore/slice/Loginslice";
import { useNavigate } from 'react-router-dom';


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
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return(
        <div style={{marginTop: '10.7%'}}>
            <div style={{display: 'inline'}}>
            <p style = {{fontSize: '20px', fontWeight: '5px'}}>First Name: {User ? User.first_name : ''} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Last Name: {User ? User.last_name : ''}</p>
            <p style = {{fontSize: '20px', fontWeight: '5px'}}>Username: {User ? User.username : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Email: {User ? User.email : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Date of birth: {User ? User.date_of_birth : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Gender: {User ? User.gender : 'error'}</p>
                <p style = {{fontSize: '20px', fontWeight: '5px'}}>Depression level: {depression}</p>

                <button className='btn btn-danger' onClick={logouts}>log Out</button>

            </div>
            </div>
    )
}

export default UserProfile;