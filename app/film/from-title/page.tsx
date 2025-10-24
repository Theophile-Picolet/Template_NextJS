"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "../page.module.scss";

interface Movie {
  id: number;
  title: string;
  description: string;
  director: string;
  release_date: string;
  runtime: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  vote_count: number;
}

export default function FilmByTitlePage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  /*  const id = searchParams.get('id'); */
  const [movie, setMovie] = useState<Movie | null>(null);
  const [genre, setGenre] = useState<string | null>(null);
  const [actors, setActors] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!title) return;
      try {
        setLoading(true);
        setError(null);
        // Récupérer le film par titre
        // const { data } = await axios.get(`http://localhost:1338/api/movies/from-title?title=${encodeURIComponent(title)}`);
        const { data } = await axios.get(
          `http://localhost:1337/api/movies/from-title?title=${encodeURIComponent(title)}`
        );
        /* const actorMovies = await axios.get(`http://localhost:1338/api/movie-actors/movie/${encodeURIComponent(id)}`); */
        setMovie(data);
        setGenre(data.movie_genres?.[0]?.genre_name || null);
        setActors(data.actors || null);
        console.info("Movie data:", movie);
        console.info("Genre:", genre);
        /*         console.info('Actors:', actorMovies);
         */
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Erreur lors du chargement du film");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [title]);

  /*  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  } */

  if (!movie) {
    return <div>Film introuvable</div>;
  }

  return (
    <div className={styles.filmPage}>
      <div
        className={styles.filmContainer}
        style={{
          backgroundImage: `url(${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p>Réalisateur: {movie.director}</p>
        <p>Date de sortie: {movie.release_date}</p>
        <p>Durée: {movie.runtime} minutes</p>
        <p>Genres : {movie.movie_genres?.map((g: any) => g.genre_name).join(", ")}</p>
        <p>
          Note: {movie.vote_average}/10 ({movie.vote_count} votes)
        </p>
        <ul>
          {movie.movies?.map((m) => (
            <li key={m.id}>
              {m.actor?.name}
              {m.character_name ? ` — ${m.character_name}` : ""}
            </li>
          ))}
        </ul>
        {movie.poster_path && <img src={movie.poster_path} alt={movie.title} style={{ maxWidth: "300px" }} />}
      </div>
    </div>
  );
}
