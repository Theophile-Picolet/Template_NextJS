'use client';
import axios from 'axios';
import { title } from 'process';
import { use, useEffect, useState } from 'react';

interface movies {
  id: number;
  title: string;
  description: string;
  director: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}


export default  function FilmPage({ title }: { title: string }) {

  const [movie, setMovie] = useState<movies | null>(null);

    useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1338/api/movies/from-title?title=${title}`);
        setMovie(data);
        console.info(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    
    fetchMovies();
  }, []);

  console.info(movie);

/*  const  {data} = await axios.get(`http://localhost:1338/api/movies/from-title?title=${params.title}`) */
/*   const movie = data;
  console.info (movie); */

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Director: {movie.director}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      <img src={movie.poster_path} alt={movie.title} />
    </div>
  );

}