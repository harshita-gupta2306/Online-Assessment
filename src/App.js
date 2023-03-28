
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import Firsthome from './components/Firsthome';
import Test from './components/Test';
import {Routes, Route} from "react-router-dom";
import Instruction from './components/Instruction';

function App() {
  return (
    <>
      <Header />
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
