import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateBook() {
  const [values,setValues] = useState({
    name:'',
    author:'',
    date:''
  })

  const nevigate = useNavigate();

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3030/create',values)
    .then(res => nevigate("/"))
    .catch(err => console.log(err))
  }
  return (
    <div class='d-flex align-items-center flex-column mt-3'>
      <h1>Add a Book</h1>
      <form className='w-50' onSubmit={handleSubmit} >
        <div class="mb-3 mt-3">
          <label for="name" class="form-label"> Book Name:</label>
          <input type="text" class="form-control" id="name" placeholder="Enter Book Name" name="name" onChange={(e)=> setValues({...values,name:e.target.value})} />
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Author Name:</label>
          <input type="text" class="form-control" id="author" placeholder="Enter Author Name" name="author" onChange={(e)=> setValues({...values,author:e.target.value})} />
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Publish Date:</label>
          <input type="date" class="form-control" id="date" name="date" onChange={(e)=> setValues({...values,date:e.target.value})} />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateBook