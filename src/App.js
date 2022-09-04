import './App.css';
import Home from './Components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navebar from './Components/Navebar';
import About from './Components/About';
import NotesState from './Context/notes/NotesState';
import { Alert } from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import React, { useState } from "react";


function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    },1500)
  }
  return (
    <>
      <NotesState>
        <Router>
          <Navebar />
          <Alert alert={alert}/>
          <div className="container-fluid">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NotesState>
    </>
  );
}

export default App;
