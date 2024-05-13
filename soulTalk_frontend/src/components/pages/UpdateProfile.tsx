import React from "react"
import "../../styles/UpdateProfile.css"
import {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import { login } from "../../reduxStore/slice/Loginslice"
import axios from "axios";
import bg from "../../assets/images/bg1.jpg"
import {useNavigate} from "react-router-dom";
import {responsiveFontSizes} from "@mui/material";




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
const UpdateProfile =()=>
{

    const [User, setUser] = useState<any>()
    const [first_name, setfirst_name] = useState<any>()
    const [last_name, setlast_name] = useState<any>()
    const [email, setEmail] = useState<any>()
    const [username, setUsername] = useState<any>()
    const navigate = useNavigate()
    const checkLogin = useSelector((state: any) => state?.login.isLoggedIn)

    const fetchUser = async() => {
        try {
            let response = await client.get('/api/userview/')
            const user = await response.data.user
            if(user) {
                console.log("TEst")
                setfirst_name(user.first_name)
                setlast_name(user.last_name)
                setEmail(user.email)
                setUsername(user.username)
            }
        }catch(e){
            console.log(e)
        }

    }

    const UpdatingProfile = async(e:any) => {
        e.preventDefault()
        console.log("Email:  " + email)
        try {
            let response = await client.post('/api/update_profile/', {
                first_name: first_name,
                last_name: last_name,
                username: username,
                email: email

            })
            if(response.status >= 200 && response.status < 300){
                console.log("Updated successfully")
                navigate('/UserProfile')
            }

        }catch(e){
            console.log(e)
        }


    }


    useEffect(() => {
        if(!checkLogin){
      navigate('/logIn')
      alert('Kindly login to access all pages')
    }
        fetchUser()
    }, [])

    return (
     <div className="header" style={{backgroundImage:`url(${bg})`}}>
         <form className="form">

             <div className="flex">
                 <label>
                     <input placeholder="" value={first_name} type="text" className="input" onChange={e=>setfirst_name(e.target.value)} required/>
                         <span>First Name</span>
                 </label>

                 <label>
                     <input placeholder="" value={last_name} type="text" className="input" onChange={e=>setlast_name(e.target.value)} required/>
                         <span>Last Name</span>
                 </label>
             </div>

             <label>
                 <input placeholder="" value={username} type="text" className="input" onChange={e=>setUsername(e.target.value)} required/>
                     <span>Username</span>
             </label>

             <label>
                 <input  placeholder="" value={email} type="text" className="input" onChange={e=>setEmail(e.target.value)} required/>
                     <span>Email</span>
             </label>

             <button className="submit" onClick={UpdatingProfile}>Submit</button>

         </form>
     </div>
    )
};

export default UpdateProfile;