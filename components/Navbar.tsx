import styles from './Navbar.module.scss';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.menu}>
      <li><Link href="/">CINEVERSE</Link></li>
      <ul className={styles.navList}>
        <li><Link href="/film">Films</Link></li>
        <li>
          <Link href="/actor">Acteurs</Link>
        </li>
        <li><Link href="/director">Réalisateurs</Link></li>
      </ul>
      <img src="/images/avatar.webp" alt="Connexion" />
    </div>
    </nav>
  );
}
