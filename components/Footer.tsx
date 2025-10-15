import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Mon Entreprise. Tous droits réservés.</p>
    </footer>
  );
}
