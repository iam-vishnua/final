import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <main className=" h-screen bg-cover bg-center bg-gray-500 opacity-90 bg-[url('/images/home.jpg')]">
            <section className='h-full flex flex-col justify-center items-center  '>
                <h1 className='text-6xl font-bold mb-12 text-white'>Fit Me</h1>
                <p className='text-4xl mb-12 font-semibold text-white'>Your Perfect Workout Partner</p>
                <div className='flex flex-row gap-6'>
                     <Link to={'/login'} className='py-3 px-4 bg-orange-600 text-white font-bold rounded-full '>Login</Link>
                     <Link to={'/bmi'} className='py-3 px-4 bg-orange-600 text-white font-bold rounded-full'>Know your Bmi</Link>
                </div>
               
            </section>
        </main>
            
        
    );
}

export default Home;