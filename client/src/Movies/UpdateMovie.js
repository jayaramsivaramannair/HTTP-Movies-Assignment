import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = (props) => {
    const [currentMovie, setCurrentMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: '', //Values put into 'stars' property must be an array of strings. 
    })
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log(res);
                setCurrentMovie({
                    title: res.data.title,
                    director: res.data.director,
                    metascore: res.data.metascore,
                    stars: res.data.stars.join(',')
                });
            })
            .catch((err) => console.log(err))
    }, [id])

    const registerChange = (evt) => {
        console.log(currentMovie);
        let formValue = (evt.target.name === 'stars' ? evt.target.value.split(',') : evt.target.value);
        setCurrentMovie({ ...currentMovie, [evt.target.name]: formValue });
    }

    return (
        <div>
            <form>
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
                <button>Confirm Changes!</button>
            </form>
        </div>
    )
}

export default UpdateMovie;