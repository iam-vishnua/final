import React from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/auth/authSlice';



function Login(props) {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleLogin=(e)=>{
    e.preventDefault()
    const form = e.target
    const email=form["email"].value
    const password=form["password"].value
    axios.post('http://localhost:3000/users/login', { email, password },{withCredentials:true})
  .then(data => {
    
    const user=data.data.user
    console.log(user)
    
    dispatch(addUser(user))
    console.log("Login success");
    navigate('/records');
  })
  

.catch(error => {
  
      alert("Inorrect user name or Password");
 
    
  })
}
    return (
      <main className='h-screen  '>
        <section className='h-full flex flex-col  justify-center items-center'  >
          <form className='flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/50 p-8 rounded-2xl  'onSubmit={handleLogin}>
            <label htmlFor='email'>Email</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-full px-3' type="email"name="email"id="email"/>
            <label htmlFor='password'>Password</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-full px-3' type="password"name="password"id="password"/>
            <button type="submit "className='py-1 px-4 bg-orange-500 text-white rounded-full'>Login</button>
          </form>
          <Link className='text-red-400' to={"/signup"}>Dont have account?signup</Link>
        </section>
      </main>
    );
}

export default Login;