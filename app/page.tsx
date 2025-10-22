'use client';
import styles from './page.module.scss';
import { useState } from 'react';
import Image from 'next/image';
import Modal from '@/components/Modal';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import MovieCard from '@/components/MovieCard';
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <body className={styles.body}>
       <header className={styles.header}>
      <div className={styles.headerContainer}>
        <button type='button' className={styles.button} onClick={() => setShowLogin(true)}>Se connecter</button>
        <button type='button' className={styles.button} onClick={() => setShowRegister(true)}>Nous rejoindre</button>
      </div>
      <Modal isOpen={showLogin} onClose={() => setShowLogin(false)}>
        <LoginForm />
      </Modal>
      <Modal isOpen={showRegister} onClose={() => setShowRegister(false)}>
        <RegisterForm />
      </Modal>
      <div className={styles.searchContainer}>
        <Image src="/images/search.webp" className={styles.searchIcon} alt="recherche" width={40} height={40} />
        <input type="text" placeholder="Rechercher un film, un acteur..." className={styles.searchInput} />
      </div>
    </header>
    <main className={styles.main}>
      <h2>Les tendances</h2>
      <div className={styles.movieList}>
        <MovieCard
          title="Titre du film"
          genre="Genre du film"
          posterUrl="/images/leParrain.webp"
          id={1}
        />
        <MovieCard
          title="Titre du film"
          genre="Genre du film"
          posterUrl="/images/peakyBlinder.webp"
          id={2}
        />
        <MovieCard
          title="Titre du film"
          genre="Genre du film"
          posterUrl="/images/readyPlayer.webp"
          id={3}
        />
        <MovieCard
          title="Titre du film"
          genre="Genre du film"
          posterUrl="/images/starWars.webp"
          id={4}
        />
         <MovieCard
          title="Titre du film"
          genre="Genre du film"
          posterUrl="/images/starWars.webp"
          id={5}
        />
      </div>
    </main>
    <footer className={styles.footer}>
  <div className={styles.footerLinks}>
    <ul>
      <li>Accueil</li>
      <li>Connexion</li>
      <li>S’inscrire</li>
      <li>A propos</li>
    </ul>
    <div className={styles.footerDivider}></div>
    <ul>
      <li>Accessibilité</li>
      <li>Politique de confidentialité</li>
      <li>Politique de gestion des cookies</li>
      <li>Contrat d’utilisation</li>
    </ul>
  </div>
  <div className={styles.footerCopyright}>
    @ Brief2 & Tri-City Kings
  </div>
</footer>
    </body>
   
  );
}