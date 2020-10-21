import React, { useState } from 'react'

import MovieCards from './MovieCards'

import '../styles/search.css'

const Search = () => {

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])
    const [defaultQuery, setDefaultQuery] = useState()

    const searchMovies = async (e) => {
        e.preventDefault()

        const url = `https://api.themoviedb.org/3/search/movie?api_key=c06ca1079341f0b62f0141aae3052485&language=en-US&query=${query}&page=1&include_adult=false`;

        let defaultQuery
        if (query) {
            setDefaultQuery(false)
            try {
                const res = await fetch(url)
                const data = await res.json()
                setMovies(data.results)
            } catch (err) {
                console.error(err)
            }
        }
        else {
            setDefaultQuery(true)
        }
    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">Movie Name</label>
                <input
                    type="text"
                    name="query"
                    className="input"
                    placeholder="i.e. Avengers"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="button"
                >
                    Search
            </button>
            </form>
            <p className="validPara" style={defaultQuery ? { display: "block" } : { display: "none" }}>*Enter a valid keyword</p>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => {
                    return (
                        <MovieCards movie={movie} key={movie.id} />
                    )
                })
                }
            </div>
        </>
    )
}

export default Search
