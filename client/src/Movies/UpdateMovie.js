import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = ({ setMovieList, movieList }) => {
    const [currentMovie, setCurrentMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    })
    const { id } = useParams();
    console.log(id);

    const history = useHistory();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log(res);
                setCurrentMovie({
                    id: res.data.id,
                    title: res.data.title,
                    director: res.data.director,
                    metascore: res.data.metascore,
                    stars: res.data.stars
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }, [id])

    const registerChange = (evt) => {
        console.log(currentMovie);
        //let formValue = (evt.target.name === 'stars' ? evt.target.value.split(',') : evt.target.value);
        setCurrentMovie({ ...currentMovie, [evt.target.name]: evt.target.value });
    }

    const updateChanges = (evt) => {
        evt.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, currentMovie)
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err));
        history.push('/');
    }

    return (
        <div>
            <form onSubmit={updateChanges}>
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
                {/*
                <label>Stars:
                    <input
                        name="stars"
                        placeholder="Stars"
                        value={currentMovie.stars}
                        type="text"
                        onChange={registerChange}
                    />
                </label>
                */}
                <button>Confirm Changes!</button>
            </form>
        </div>
    )
}

export default UpdateMovie;