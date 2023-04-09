
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from './components/Header';
import Register from './components/Register';
import Firsthome from './components/Firsthome';
import Test from './components/Test';
import {Routes, Route} from "react-router-dom";
import Instruction from './components/Instruction';
import React, { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Assessment from './components/Assessments'

function App() {
  // useEffect(() => {
  //   const disableRightClick = (event) => {
  //     if (event.button === 2) {
  //       event.preventDefault();
  //     }
  //   };
  //   document.addEventListener('contextmenu', disableRightClick);
  //   return () => {
  //     document.removeEventListener('contextmenu', disableRightClick);
  //   };
  // }, []);

  const handle = useFullScreenHandle();

  return (
    <>
      {/* <Header /> */}
      <Routes>
        {/* <Route path='/assessment/' element= {<Firsthome />} /> */}
        <Route path='/register/:id' element={<Register />} />
        <Route path='/test' element={<Test/>}/>
        <Route path='/instructions' element={<Instruction/>}/>
        <Route path='/' element={<Assessment/>}/>
      </Routes>
    </>

  );
}

export default App;
