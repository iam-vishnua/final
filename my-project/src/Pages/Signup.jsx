import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup(props) {
    const navigate=useNavigate();
  const handlesignup=(e)=>{
    e.preventDefault()
    const form = e.target
    const name=form["name"].value
    const email=form["email"].value
    const password=form["password"].value
    axios.post('http://localhost:3000/users/signup',{name,email,password})
    .then(data=>{
      console.log(data)
      console.log("success")
      navigate('/login')
      
    })
    .catch(err=>{
      console.log("not")
    })
  }

    
    return (
        <main className='h-screen'>
        <section className='h-full flex flex-col justify-center items-center'  >
          <form className='flex flex-col bg-cyan-500 shadow-lg shadow-cyan-500/50 p-8 rounded-2xl'onSubmit={handlesignup}>
          <label htmlFor='username'>Username</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-full px-3' type="name"name="username"id="name"/>
            <label htmlFor='email'>Email</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-full px-3' type="email"name="email"id="email"/>
            <label htmlFor='password'>Password</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-full px-3' type="password"name="password"id="password"/>
            <button type="submit "className='py-1 px-4 bg-orange-500 text-white rounded-full'>SignUp</button>
          </form>
          
        </section>
      </main>
    );
}


export default Signup;