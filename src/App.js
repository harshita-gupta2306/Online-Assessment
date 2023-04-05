
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from './components/Header';
import Home from './components/Home';
import Firsthome from './components/Firsthome';
import Test from './components/Test';
import {Routes, Route} from "react-router-dom";
import Instruction from './components/Instruction';
import React, { useEffect } from 'react';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

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
        <Route path='/' element= {<Firsthome />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Test' element={<Test/>}/>
        <Route path='/instructions' element={<Instruction/>}/>
      </Routes>
    </>

  );
}

export default App;
