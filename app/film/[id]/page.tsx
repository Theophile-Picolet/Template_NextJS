"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Movie {
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

export default function FilmPage() {
  const params = useParams();
  const movieId = params.id;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        setError(null);

        // Récupérer le film par ID
        const { data } = await axios.get(`http://localhost:1337/api/movies/${movieId}`);
        setMovie(data);
        console.info("Movie data:", data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Erreur lors du chargement du film");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!movie) {
    return <div>Film introuvable</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Réalisateur: {movie.director}</p>
      <p>Date de sortie: {movie.release_date}</p>
      <p>Durée: {movie.runtime} minutes</p>
      <p>
        Note: {movie.vote_average}/10 ({movie.vote_count} votes)
      </p>
      {movie.poster_path && <img src={movie.poster_path} alt={movie.title} style={{ maxWidth: "300px" }} />}
    </div>
  );
}
