import styles from './RegisterModal.module.scss';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} type="button" onClick={onClose}>&times;</button>
        <h2>Nous rejoindre</h2>
  <form className={styles.form}>
          <label htmlFor="name">Nom</label>
          <input type="text" id="name" name="name" required className={styles.input} />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className={styles.input} />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" required className={styles.input} />
          <button type="submit" className={styles.submit}>Inscription</button>
        </form>
      </div>
    </div>
  );
}
