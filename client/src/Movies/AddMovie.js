import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AddMovie = (props) => {
    const [currentMovie, setCurrentMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    const history = useHistory();

    const registerChange = (evt) => {
        console.log(currentMovie);
        //This allows us to change the typed values back into an array
        let formValue = (evt.target.name === 'stars' ? evt.target.value.split(',') : evt.target.value);
        setCurrentMovie({ ...currentMovie, [evt.target.name]: formValue });
    }

    const addNewMovie = (evt) => {
        evt.preventDefault();
        axios.post(`http://localhost:5000/api/movies`, currentMovie)
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err));
        history.push('/');
    }

    return (
        <div>
            <form onSubmit={addNewMovie}>
                <label>Title:
                    <input
                        name="title"
                        placeholder="Title"
                        value={currentMovie.title}
                        type="text"
                        onChange={registerChange}
                    />
                </label>
                <label>Director:
                    <input
                        name="director"
                        placeholder="Director"
                        value={currentMovie.director}
                        type="text"
                        onChange={registerChange}
                    />
                </label>
                <label>Metascore:
                    <input
                        name="metascore"
                        placeholder="Metascore"
                        value={currentMovie.metascore}
                        type="text"
                        onChange={registerChange}
                    />
                </label>
                <label>Stars:
                    <input
                        name="stars"
                        placeholder="Stars"
                        value={currentMovie.stars}
                        type="text"
                        onChange={registerChange}
                    />
                </label>
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie;