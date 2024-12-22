
import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateBook() {
  const{id} =useParams();
  const [values,setValues] = useState({
    name:'',
    author:'',
    date:''
  })

  const nevigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.put('http://localhost:3030/update/'+id,values)
    .then(res => nevigate("/"))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get('http://localhost:3030/getrecord/'+id)
        .then(res => {
            console.log(res); // Log the entire response
            if (res.data) {
                setValues({...values, name: res.data[0].name, author: res.data[0].author, date: res.data[0].date});
            } else {
                console.log("Data is undefined");
            }
        }).catch(err => {
            console.error("Error fetching data:", err);
            setError("Failed to fetch data");
        });
}, []);

  return (
    <div class='d-flex align-items-center flex-column mt-3'>
    <h1>Update  a Book</h1>
    <form className='w-50' onSubmit={handleSubmit} >
      <div class="mb-3 mt-3">
        <label for="name" class="form-label"> Book Name:</label>
        <input type="text" value={values.name} class="form-control" id="name" placeholder="Enter Book Name" name="name" onChange={(e)=> setValues({...values,name:e.target.value})} />
      </div>
      <div class="mb-3">
        <label for="author" class="form-label">Author Name:</label>
        <input type="text" value={values.author}  class="form-control" id="author" placeholder="Enter Author Name" name="author" onChange={(e)=> setValues({...values,author:e.target.value})} />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Publish Date:</label>
        <input type="date" value={values.date}  class="form-control" id="date" name="date" onChange={(e)=> setValues({...values,date:e.target.value})} />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default UpdateBook