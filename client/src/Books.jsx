import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Books() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3030')
            .then(res => {
                console.log(res); // Log the entire response
                if (res.data) {
                    setBooks(res.data);
                } else {
                    console.log("Data is undefined");
                }
            }).catch(err => {
                console.error("Error fetching data:", err);
                setError("Failed to fetch data");
            });
    }, []);

    const handleDelete = (id)=>{
        axios.delete('http://localhost:3030/delete/'+id)
        .then(res=>{
            window.location.reload()
        })
        .catch(err=>{console.log(err)})
    }

    return (
        <div className='container mt-5'> 
            <Link to="/create" className='btn btn-success'> Create Book</Link>
            {error ? <h2>{error}</h2> : books.length !== 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Author</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.author}</td>
                                <td>{book.date}</td>
                                <td>
                                    <Link to={`/update/${book.id}`}className='btn btn-info btn-sm me-2'>Update</Link>
                                    <button type='button' onClick={()=> handleDelete(book.id)} className='btn btn-sm btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <h2>No Record</h2>}
        </div>
    );
}

export default Books;