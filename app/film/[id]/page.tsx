
'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.scss';

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
  movies?: { id: number; actor?: { name: string }; character_name?: string }[];
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
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error) {
    return <div className={styles.error}>Erreur: {error}</div>;
  }

  if (!movie) {
    return <div className={styles.error}>Film introuvable</div>;
  }

  return (
    <div className={styles.filmPage}>
      {/* Hero Section avec background */}
      <div className={styles.heroSection} style={{ backgroundImage: `url(${movie.backdrop_path || movie.poster_path})` }}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.movieInfo}>
              <h1 className={styles.movieTitle}>{movie.title}</h1>
              <div className={styles.movieGenres}>
                {movie.movie_genres?.map((g: any) => g.genre_name).join(", ") || "Drame, Action, Crime, Thriller"}
              </div>
              <div className={styles.movieDetails}>
                <span className={styles.duration}>{movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '2h 32m'}</span>
                <span className={styles.releaseDate}>{new Date(movie.release_date).toLocaleDateString('fr-FR')}</span>
                <span className={styles.director}>{movie.director}</span>
                <span className={styles.role}>Réalisateur</span>
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