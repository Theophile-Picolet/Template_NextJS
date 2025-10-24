"use client";
import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [movies, setMovies] = useState([]);
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("title") || "");
  const router = useRouter();
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get("http://localhost:1337/api/movies");
        console.log("les data recu", data);
        setMovies(data);
        console.info(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  console.info(movies);

  const handleSearchClick = () => {
    if (searchValue.trim()) {
      const params = new URLSearchParams(searchParams);
      params.set("title", searchValue.trim());
      router.push(`/film/from-title?${params.toString()}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <button type="button" className={styles.button} onClick={() => setShowLogin(true)}>
            Se connecter
          </button>
          <button type="button" className={styles.button} onClick={() => setShowRegister(true)}>
            Nous rejoindre
          </button>
        </div>
        <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
          <LoginForm />
        </Modal>
        <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
          <RegisterForm />
        </Modal>
        {/* <div className={styles.searchContainer}>
          <button type="button" onClick={(e) => handleSearch(e.target.value)}>
            <Image src="/images/search.webp" className={styles.searchIcon} alt="recherche" width={40} height={40} />

            <Image src="/images/search.webp" className={styles.searchIcon} alt="recherche" width={40} height={40} />
            <input type="text" placeholder="Rechercher un film, un acteur..." className={styles.searchInput} />
          </button>
        </div> */}

        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Rechercher un film, un acteur..."
            className={styles.searchInput}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearchClick} className={styles.searchButton}>
            <Image src="/images/search.webp" alt="recherche" width={30} height={30} />
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainContainerMovie}>
          <h2>Les tendances</h2>
          <div className={styles.movieList}>
            <MovieCard title="Titre du film" genre="Genre du film" posterUrl="/images/leParrain.webp" id={1} />
            <MovieCard title="Titre du film" genre="Genre du film" posterUrl="/images/peakyBlinder.webp" id={2} />
            <MovieCard title="Titre du film" genre="Genre du film" posterUrl="/images/readyPlayer.webp" id={3} />
            <MovieCard title="Titre du film" genre="Genre du film" posterUrl="/images/starWars.webp" id={4} />
            <MovieCard title="Titre du film" genre="Genre du film" posterUrl="/images/starWars.webp" id={5} />
          </div>
          <div className={styles.movieList}>
            {movies.map((movie: movies) => (
              <MovieCard
                key={movie.id}
                title={movie?.title}
                genre={movie?.director}
                posterUrl={movie?.poster_path}
                id={movie?.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
