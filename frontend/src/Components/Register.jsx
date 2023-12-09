import React, {useState } from 'react'
import '../styles/login.css'
import { Button, Col, Container, Form, FormGroup, Row } from 'reactstrap'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import registerImg from './register.png'
import userIcon from './user.png'


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const Register = () => {
 const navigate=useNavigate();
  const [Credentials,setCredentials]=useState({
    email:undefined,
    username:undefined,
    password:undefined
})


const handleChange = e => {
    setCredentials(prev=>({...prev, [e.target.id]:e.target.value}))
};

const handleClick=async e=>{
  e.preventDefault();
  console.log(Credentials);
      const {username,email,password}=Credentials;
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
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
            localStorage.setItem('token',json.authtoken);
    
         
            navigate('/')
            setTimeout(() => {
              return    toast.success("Registered Sucessfully", {
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
        }else{
            //  console.log("Invalid credentials","danger");
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
  }




  return (
    <section className='login-section'>
<ToastContainer />

      <Container>
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

                  <Button className='btn login-btn secondary_btn auth_btn' type='submit'>Create Account</Button>
                </Form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Register


