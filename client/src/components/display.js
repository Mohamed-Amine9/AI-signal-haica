import React, { Fragment, useEffect ,useState} from 'react';

const Display =()=>{

    const getTodos=async()=>{
   
        const [todos,setTodos]=useState([]);
    try {
        const response=await fetch("http://localhost:5000/users");
        const jsonData= await response.json();
        setTodos(jsonData);
         
    } catch (err) {
        console.error(err.message);
    }
    }
    useEffect(()=>{
    getTodos();
    })
    return(
        <Fragment>
            <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">First</th>
      <th scope="col">edit</th>
      <th scope="col">delete</th>
 
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mardcdklk</td>
      <td><button type="button" className="btn btn-danger">Danger</button></td>
      <td><button type="button" className="btn btn-success">Danger</button></td>
    </tr>
  
  </tbody>
</table>


        </Fragment>
        )
}
export default Display;