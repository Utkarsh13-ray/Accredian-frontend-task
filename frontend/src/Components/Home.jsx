import React from 'react'
import './Home.css'
import {Link, useNavigate} from "react-router-dom"
import { useState ,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/');
    setTimeout(() => {
      
      return toast.success("Logged Out", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }, 1000); 
  }
  const [name, setNames] = useState("");
  useEffect(() => {
    
    console.log('hi')
    if(localStorage.getItem('token')){
      // getUser();
    

    const getUser=async ()=>{
      const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
        method: 'GET', 
    
        headers: {
          'auth-token':localStorage.getItem('token')
        ,
        },
  
      });

      //eslint-disable-next-line

      const json=await response.json();

      console.log(response);
      console.log(json);
      setNames(json.name);
      // console.log(name);
    }
    
    getUser();
  }
  }, [])
  return (
    <div >
      <ToastContainer />
        {localStorage.getItem('token')? 
        <div className="container">
          <div className='text'>
         Hii I am Utkarsh and I and hoping to work with you in Accredian.
         </div>
         <div className='text'>
         You logged in as Respected {name}.
         </div >
         <button className='button' onClick={handleLogout}>LogOut</button> 
        </div> :
        <div className="container">
         <div className='text'>
         Respected user Please Login
         </div>
         <Link to="/login"><button className='button'>Login</button></Link>
        </div>
        }
    </div>
  )
}
