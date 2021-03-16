import React from 'react';
import { useParams } from 'react-router-dom';

const UpdateMovie = (props) => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            Hello from Update Movie Component!
        </div>
    )
}

export default UpdateMovie;