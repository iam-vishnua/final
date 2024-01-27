import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';

function Root(props) {
    const user=useSelector(state=>state.auth.user)
    return (
        <>
       
        
         <header className='h-20 flex flex-row items-center justify-between bg-gray-500 opacity-90 text-white font-mono font-bold text-xl px-8'>
        <span>FitMe</span>
        <ul className='flex flex-row gap-6 '>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/workouts"}>Exercises</Link>
            </li>
            <li>
                <Link to={"/records"}>Records</Link>
            </li>
            <li>
                {user?<span className=' w-9 h-9 rounded-full bg-cyan-400 flex flex-row items-center justify-center text-xl'>{user.name.charAt(0)}</span>:<Link className='bg-cyan-400 py-3 px-4 text-white font-bold mb-10 rounded-lg' to={"/login"}>Login</Link>}
            </li>
          
        </ul>
        
      </header>
    
      
      <Outlet/>
      
      <footer className='flex flex-row justify-between bg-gray-500 opacity-90 items-center  font-bold text-white p-4 text-sm'>
        <span>&copy;vishnu a</span>
        <span>&copy;fitness tracker app</span></footer></>
           
        
    );
}

export default Root;