import React from 'react'
import { Link } from 'react-router-dom';
import { userAuthStore } from '../../Store/authStore';

const Home = () => {

 const {user}=userAuthStore()

  return (
    <div className='bg-red-100'>
    <h1>hello {user?user.name:"world"}  </h1>

    <h1> working home route </h1>
    <br></br>
    <br></br>
    <br></br><br></br><br></br>
    <Link to="/signup">signup</Link><br></br>
    <br></br>
    <br></br>
    <br></br>
    <Link to="/login">
    LOGIN</Link><br></br>
    <br></br>
    <br></br>

    <Link to="/verify-OTP">verify OTP</Link><br></br> <br></br><br></br>

    <Link to="/forget-password">    forget-password
</Link><br></br>

    </div>
  )
}

export default Home