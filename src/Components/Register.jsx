import React, {useState } from 'react'
import '../styles/login.css'
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import registerImg from './register.png'
import userIcon from './user.png'


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useEffect } from 'react';
import Spinner from './Spinner/Spinner';


const Register = () => {
 const navigate=useNavigate();
 const [loading,setLoading]=useState(0)
  const [Credentials,setCredentials]=useState({
    email:undefined,
    username:undefined,
    password:undefined,
    cpassword:undefined
})




const handleChange = e => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
};

useEffect(()=>{
 console.log()
},[]);
const handleClick=async e=>{
  e.preventDefault();
  setLoading(1)
  const {username,email,password,cpassword}=Credentials;
  if(password===cpassword){
   
    const response = await fetch("https://acceredian-backend.onrender.com/api/auth/createuser", {

      method: 'POST', 
      
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:username,email,Password:password})
        });
        const json=await response.json(); 
        console.log(json);
        if(json.success){
            //redirect
            // localStorage.setItem('token',json.authtoken);
    
         
            navigate('/login')
            setTimeout(() => {
              return    toast.success("Registered Succesfull, Please login", {
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
            // props.showAlert("Account created successfully","success");
            setLoading(0)
          }else{
            //  console.log("Invalid credentials","danger");
            setLoading(0)
            setTimeout(() => {
              
              return toast.error("Invalid Credentials", {
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
          
        }else{
          console.log(Credentials);
                      //  console.log("Invalid credentials","danger");
                      setTimeout(() => {
          toast.error("Passwords do not match", {
            position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
          })
        }, 1000); 
        }
  }




  return (
    <section className='login-section'>
<ToastContainer />

      {loading?<Spinner/>:<Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login-container d-flex justify-content-between align-items-center'>
              <div className='login-img'>
                <img src={registerImg} /> 
              </div>

              <div className='login-form'>
                <div className='user'>
                  <img src={userIcon} />
                </div>
                <h2>Register</h2>

                <Form onSubmit={handleClick}>
                <FormGroup>
                    <input type='email' placeholder='Email' required id='email' onChange={handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <input type='text' placeholder='Username' required id='username' onChange={handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <input type='password' placeholder='Password' required id='password' onChange={handleChange}/>
                  </FormGroup>
                  <FormGroup>
                    <input type='password' placeholder='Confirm Password' required id='cpassword' onChange={handleChange}/>
                  </FormGroup>

                  <Button className='btn login-btn secondary_btn auth_btn' type='submit'>Create Account</Button>
                </Form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>}
    </section>
  )
}
export default Register


