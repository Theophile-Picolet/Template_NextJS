// Alternative pour MovieCard.tsx si vous préférez utiliser le titre
import Image from 'next/image';
import styles from './MovieCard.module.scss';
import Link from 'next/link';

interface MovieCardProps {
    title: string;
    genre: string;
    posterUrl: string;
    id: number;
}

export default function MovieCard(movie: MovieCardProps) {
    return (
        <div className={styles.movieCard}>
            <Link href={`/film/from-title?title=${encodeURIComponent(movie.title)}`}>
                <Image src={movie.posterUrl} alt="Movie Poster" width={300} height={450} />
                <div className={styles.movieInfo}>
                    <h3>{movie.title}</h3>
                    <p>{movie.genre}</p>
                </div>
            </Link>
        </div>
    );
}