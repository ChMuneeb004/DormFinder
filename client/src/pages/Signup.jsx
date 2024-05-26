import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css_folder/Signup.css';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import vectors from '../media/Vectors.png';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function SignupPage() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [profile, setprofile] = useState(undefined);
    const [username, setUsername] = useState("");
    const [CNIC, setCNIC] = useState();
    const [DOB, setDOB] = useState(undefined);
    const [Phone, setPhone] = useState();
    const navigate = useNavigate();  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!CNIC || !Phone || !email || !password || !username || !DOB) {
        alert('Please fill in all required fields.');
        return;
      }
      const userData = {
        username,
        password,
        email,
        DOB,
        CNIC,
        Phone,
        userType: profile,
      };
      console.log(userData);
      try {

        let signupEndpoint = '';
        if (profile === 'Customer') {
          signupEndpoint = 'http://localhost:3001/signupCustomer';
        } else if (profile === 'Owner') {
          signupEndpoint = 'http://localhost:3001/signupOwner';
        } else {
          console.error('Invalid profile type:', profile);
          return;
        }

        axios
          .post(signupEndpoint, userData)
          .then((response) => {
            console.log(response.data);
            alert('Your account has been successfully created');
            // if(profile === 'Customer'){
            //   navigate('./pages/CustomerPage');
            // }
            // else if (profile === 'Owner') {
            //   navigate('./pages/Dashboard');
            // }
            // else {
            //   console.error('cannot navigate profile type:', profile);
            // }
            navigate('/login');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    
        setemail('');
        setPassword('');
        setUsername('');
        setCNIC('');
        setDOB('');
        setPhone('');
        setprofile('');
      } catch (error) {
        console.error('Circular reference detected:', error);
      }
    };
    const handleProfileChange = (e) => {
        setprofile(e.target.value);
      };
    return(
        
      <div className="signupPage">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>What is your Email?</label>
          <input
            placeholder="Email"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>What's your Password?</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile">Choose a Profile</label>
          <select
            name="Profile Type"
            placeholder="Profile Type"
            id="profile"
            className="profile"
            value={profile}
            onChange={handleProfileChange}
          >
            <option value="">Select Profile</option>
            <option value="Owner">Property Owner</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        {profile === 'Owner' && (
          <>
            <div className="form-group">
              <label>Enter your Username</label>
              <input
                placeholder="Username"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Enter your Date of Birth</label>
              <input
                placeholder="DOB"
                type="date"
                id="DOB"
                name="DOB"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Provide your CNIC Number</label>
              <input
                placeholder="CNIC"
                type="text"
                id="CNIC"
                name="CNIC"
                value={CNIC}
                onChange={(e) => setCNIC(e.target.value)}
                />
            </div>
          </>
        )}
        {profile === 'Customer' && (
        <>
          <div className="form-group">
            <label>Enter your Username</label>
            <input
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label>Enter your Date of Birth</label>
            <input
              placeholder="DOB"
              type="date"
              id="DOB"
              name="DOB"
              value={DOB}
              onChange={(e) => setDOB(e.target.value)}
              />
          </div>
          <div className="form-group">
              <label>Provide your CNIC Number</label>
              <input
                placeholder="CNIC"
                type="text"
                id="CNIC"
                name="CNIC"
                value={CNIC}
                onChange={(e) => setCNIC(e.target.value)}
                />
            </div>
        </>
        )}
        <div className="form-group">
          <label>Enter your Phone number</label>
          <PhoneInput className='phone'
              international
              defaultCountry="PK"
              value={Phone}
              onChange={setPhone}/>
        </div>
        <button type="submit" className="button">Create Account</button>
      </form>
      
      <div class="border-image-box"></div>

    </div>
       
        
    );
}

