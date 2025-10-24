"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
import MovieCard from "@/components/MovieCard";

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

export default function FilmPage({ title }: { title: string }) {
  const [movie, setMovie] = useState<movies | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const { data } = await axios.get(`http://localhost:1337/api/movies/from-title?title=${title}`);
        const { data } = await axios.get(`http://localhost:1337/api/movies`);
        setMovie(data);
        console.info(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  console.info(movie);

  /*  const  {data} = await axios.get(`http://localhost:1338/api/movies/from-title?title=${params.title}`) */
  /*   const movie = data;
  console.info (movie); */

  if (!movie) {
    return <div>Movie not found lor</div>;
  }

  return (
    // <div>
    //   <h1>{movie.title}</h1>
    //   <p>{movie.description}</p>
    //   <p>Director: {movie.director}</p>
    //   <p>Release Date: {movie.release_date}</p>
    //   <p>Runtime: {movie.runtime} minutes</p>
    //   <img src={movie.poster_path} alt={movie.title} />
    // </div>
    <>
      <div className={styles.movieList}>
        {movie.map((movie: movies) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            genre={movie.director}
            posterUrl={movie.poster_path}
            id={movie.id}
          />
        ))}
      </div>
    </>
  );
}
