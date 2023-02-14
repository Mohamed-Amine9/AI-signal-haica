import React,{Fragment} from 'react'
import './App.css';
import Input from './components/input';
import Display from'./components/display'
function App() {
  return (
   <Fragment>
    <div className="container" >
    <Input></Input>
    
    </div>
    <div className="d-flex justify-content-center">
      <div className="container mt-5" >
        <Display ></Display>
      </div>
    
    </div>
    
   </Fragment>
  );
}

export default App;
