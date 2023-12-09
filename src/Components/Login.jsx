import React, {useState } from 'react'
import '../styles/login.css'
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link,useNavigate} from 'react-router-dom';
import loginImg from './login.png'
import userIcon from './user.png'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {  
  let navigate=useNavigate();

  const [Credentials,setCredentials]=useState({
    email:undefined,
    password:undefined
})
 

const handleChange = e => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
};

const handleClick=async e=>{
  e.preventDefault();
  const response = await fetch("https://acceredian-backend.onrender.com/api/auth/login", {
      method: 'POST', 
  
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:Credentials.email,Password:Credentials.password})
    });
    const json=await response.json(); 
    console.log(json);
    if(json.success){
        //redirect
        localStorage.setItem('token',json.authtoken);
      
  
        navigate('/')
        setTimeout(() => {
          return    toast.success("Logged In Succesfully", {
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
        // props.showAlert("Logged in successfully","green");

    }else{
        //  props.showAlert("Invalid credentials","red");
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
        
        }, 2000); 
  
    }
}


  return (
    <section className='login-section'>
<ToastContainer />

      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className='login-container d-flex justify-content-between align-items-center'>
              <div className='login-img'>
                <img src={loginImg} />
              </div>

              <div className='login-form'>
                <div className='user'>
                  <img src={userIcon} />
                </div>
                <h2>Login</h2>

                <Form onSubmit={handleClick}>
                <FormGroup>
                    <input type='email' placeholder='Email' required id='email' onChange={handleChange}/>
                  </FormGroup>

                  <FormGroup>
                    <input type='password' placeholder='Password' required id='password' onChange={handleChange}/>
                  </FormGroup>

                  <Button className='btn login-btn secondary_btn auth_btn' type='submit'>Login</Button>
                </Form>
                <p>Don't have an account? <Link to='/register'>Create</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login
