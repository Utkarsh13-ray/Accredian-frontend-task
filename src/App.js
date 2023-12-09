
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
 

  return (
    <>

       <Router>

<div className='bg-white'>
{/* <Login/> */}
    <Routes>
    <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
    </Routes>
</div>
</Router>
    </>
  );
}

export default App;
