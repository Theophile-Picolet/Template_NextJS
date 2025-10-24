"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.scss";

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
  movie_genres?: { genre_name: string }[];
  actors?: string[];
  movies?: { id: number; actor?: { name: string }; character_name?: string }[];
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
      {/* Hero Section avec background */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${movie.backdrop_path})` }}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.movieInfo}>
              <h1 className={styles.movieTitle}>{movie.title}</h1>
              <div className={styles.movieGenres}>
                {movie.movie_genres?.map((g: any) => g.genre_name).join(", ") || "Drame, Action, Crime, Thriller"}
              </div>
              <div className={styles.movieDetails}>
                <div className={styles.movieRating}>
                <span className={styles.duration}>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '2h 32m'}</span>
                <span className={styles.releaseDate}>{new Date(movie.release_date).toLocaleDateString('fr-FR')}</span>
                </div>
                <div className={styles.directorInfo}>
                <span className={styles.director}>{movie.director}</span>
                <span className={styles.role}>Réalisateur</span>
              </div>
              </div>
            </div>
            
            {/* Synopsis intégré dans le hero */}
            <div className={styles.synopsisCard}>
              <h2 className={styles.synopsisTitle}>Synopsis</h2>
              <p className={styles.synopsisText}>
                {movie.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actors Section */}
      <div className={styles.actorsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Les Acteurs</h2>
          <div className={styles.actorsList}>
            {movie.movies?.slice(0, 12).map((m) => (
              <div key={m.id} className={styles.actorCard}>
                <div className={styles.actorPhoto}>
                  <img 
                    src="/images/placeholder-actor.jpg" 
                    alt={m.actor?.name || 'Acteur'}
                  />
                </div>
                <div className={styles.actorInfo}>
                  <div className={styles.actorName}>{m.actor?.name}</div>
                  <div className={styles.characterName}>{m.character_name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Movies Section */}
      <div className={styles.relatedSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Sur le même thème</h2>
          <div className={styles.relatedMovies}>
            {/* Films similaires à implémenter */}
          </div>
        </div>
      </div>
    </div>
  );
}
