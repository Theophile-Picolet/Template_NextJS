import styles from './Footer.module.scss';

export default function Footer() {
  return (
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
  );
}
