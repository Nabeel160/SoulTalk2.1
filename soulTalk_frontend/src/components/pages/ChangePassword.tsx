import React, { useEffect,useState } from 'react';
import axios from 'axios';
import bg from "../../assets/images/bg1.jpg";


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


const ChangePassword: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    useEffect(() => {
         if (newPassword === confirmPassword || confirmPassword == "") {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
    },[newPassword, confirmPassword])


    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let response = await client.post(`api/change_password/`, {
                old_password: oldPassword,
                new_password: newPassword,
            });
            if(response.status>=200 && response.status<300) {
                alert('Password changed successfully');
            }
        } catch (error) {
            alert('Error changing password');
            console.log(error)
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <div className="header" style={{backgroundImage:`url(${bg})`}}>
         <form className="form">


                 <label>
                     <input placeholder="" value={oldPassword} type="password" className="input" onChange={e=>setOldPassword(e.target.value)} required/>
                         <span>Old Password</span>
                 </label>


             <label>
                 <input placeholder="" value={newPassword} type="password" className="input" onChange={e=>setNewPassword(e.target.value)} minLength={8} required/>
                     <span>New Password</span>
             </label>

             <label>
                 <input  placeholder="" value={confirmPassword} type="password" className="input" onChange={e=>setConfirmPassword(e.target.value)} required/>
                     <span>Confirm Password</span>
             </label>
             {!passwordMatch && <div className="text-danger mb-4">Passwords do not match.</div>}


             <button className="submit" onClick={handleChangePassword} disabled={oldPassword=="" || newPassword=="" || confirmPassword=="" || !passwordMatch}>Submit</button>

         </form>
     </div>
        </div>
    );
};

export default ChangePassword;
