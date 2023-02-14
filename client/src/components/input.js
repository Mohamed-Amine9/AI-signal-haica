import React, { useState,Fragment} from 'react';


const Input = () => {
    
       const [description,setDescription] =useState("");
       
       const onSubmitForm = async e => {
        e.preventDefault();
        try{
        const body = { description };
        const response = fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify (body)
        });
        console.log(response);
        window.location="/";
       } catch (err) {
        console.error(err.message);
       }
      }


        return (
          <Fragment>
        <div className='text-center mt-5'>
            <h1>ToDo list</h1>
          <form  className="d-flex mt-5'" onSubmit={onSubmitForm}>
           
                <button className="btn btn-warning" type="submit" >Add</button>
            
            <input value={description} onChange={e=>setDescription(e.target.value)} type="text" className="form-control form-control-sm" placeholder='Write somthing...' aria-describedby="basic-addon1" />
          
        </form>
        </div>
        </Fragment>
        );
    
}

export default Input;