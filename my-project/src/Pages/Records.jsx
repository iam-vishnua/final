import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addOneRecord, addRecords,deleteOneRecord } from '../features/records/recordsSlice';
import { addUser } from '../features/auth/authSlice';

function Records(props) {
  const dispatch=useDispatch()
  const records=useSelector(state=>state.records.records)
  const[Recordsform,setRecordsform]=useState(false)
  const navigate = useNavigate(); 
  async function getData(){
    try{
      
      const verification= await axios.post("http://localhost:3000/users/verify",{},{withCredentials:true})
      
      const recordsData= await axios.get("http://localhost:3000/records",{withCredentials:true})
      const records=recordsData.data
      return records
    


    }
    catch(error){
      console.log(error)
    }
  }
    useEffect(()=>{
        getData().then(data=>dispatch(addRecords(data)))
        
        .catch(error=>console.log(error))
    },[])
    function handleSubmit(e){
      e.preventDefault()
      const form=e.target
      const date=form['date'].value
      const duration=form['Duration'].value
      const activity=form['Activity'].value
      const payload={
        date:date,
        duration:duration,
        activity:activity,
        
        
      }
      axios.post('http://localhost:3000/records',payload,{withCredentials:true})
      .then(data=>{
        const newRecord=data.data
        dispatch(addOneRecord(newRecord))
        setRecordsform(false)
      })
      .catch(err=>{
        console.log(err)
        setRecordsform(false)
      })
      
      
    }
    const handleLogout = () => {
      axios.post('http://localhost:3000/users/logout', {}, { withCredentials: true })
        .then(() => {
          // Clear user data from Redux store or perform any other necessary cleanup
          dispatch(addUser());
          console.log("Logout success");
          navigate('/login'); // Use the navigate function to redirect to the login page
        })
        .catch(error => {
          console.log("Logout failed:", error);
        });
    };
    
    function deleteRecord(recordId){
      axios.delete("http://localhost:3000/records/"+recordId,{withCredentials:true})
      .then(()=>{
         console.log("deleted")
         dispatch(deleteOneRecord(recordId));

      })
      .catch(error=>{
        console.log(error)
      })
      
      
    }
    return (
      <main className='relative '>
        {Recordsform&&<>
        <div className='fixed top-0 left-0 w-full h-full bg-black opacity-90'>&nbsp;</div><div className='fixed top-0 left-0 w-full h-full  flex flex-col justify-center items-center'>
          <button onClick={()=>{setRecordsform(false)}}><img  className="w-12 h-12 fixed top-4 right-4 "src="/icons/close.png"></img></button>
          <form onSubmit={handleSubmit} className='flex flex-col w-auto bg-white p-8 rounded-xl '>
            <label htmlFor='date'>Date</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-lg px-3' type="date" id="date" name="date"></input>
            <label htmlFor='Duration'>Duration(min)</label>
            <input className='border border-violet-500 mt-2 mb-4 w-96 rounded-lg px-3' type="text" id="Duration" name="Duration"></input>
            <label htmlFor='Activity'>Choose a Activity:</label>
        <select className='border border-violet-500 mt-2 mb-4 w-96 rounded-lg px-3' id="Activity" name="Activity">
      <option value="Running">Running</option>
      <option value="Walking">Walking</option>
      <option value="Swimming">Swimmimg</option>
       <option value="Weighttraining">Weight training</option>
       <option value="Yoga">Yoga</option>
       <option value="Dance">Dance</option>
       <option value="Cycling">Cycling</option>
         </select>
         <button className='bg-red-500 text-white mt-2 py-1 w-30 rounded-lg'type="submit">Add</button>
          </form>

        </div></>}
      <section className=' flex  flex-col justify-center   items-center h-screen'>
        <h1 className='font-mono text-5xl text-blue-600 mb-10 font-bold'>Your Records Are Here</h1>
        <button onClick={()=>{setRecordsform(true)}}className='bg-cyan-400 py-3 px-4 text-white font-bold mb-10 rounded-lg'>Add</button>

        
        <table className='shadow-2xl font-[Poppins]border-2 border-cyan-200 w-6/12'>
          <thead className='text-white'>
            <tr>
              <th className='py-3 bg-cyan-800'>Date</th>
              <th className='py-3 bg-cyan-800'>Activity</th>
              <th className='py-3 bg-cyan-800'>Duration(m)</th>
              <th className='py-3 bg-cyan-800'>Action</th>
            </tr>
          </thead>
          {
            records&&records.map(record=>{
              return(
                <tbody key={record._id}className='text-cyan-900 text-center'>
            <tr className='bg-cyan-200 hover:bg-cyan-100 hover:scale-105 cursor-pointer duration-300'>
              <td className='py-3 px-6'>{record.date}</td>
              <td className='py-3 px-6'>{record.activity}</td>
              <td className='py-3 px-6'>{record.duration}</td>
              <td className='py-3 px-6 text-red-500'><button onClick={()=>{deleteRecord(record._id)}}>Delete</button></td>
            </tr>
            </tbody>

              )
            })
          }
          
        </table>





      </section>
      <button onClick={handleLogout} className='bg-null py-3 px-4 text-red-500 font-bold mb-10 rounded-lg w-full m-auto'>LogOut</button>
      </main>

        
          









    );
}

export default Records;
