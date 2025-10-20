import React from 'react';
import styles from './LoginModal.module.scss';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button type="button" className={styles.close} onClick={onClose}>&times;</button>
        <h2>Se connecter</h2>
  <form className={styles.form}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required className={styles.input} />
          <label htmlFor="password">Mot de passe</label>
          <input type="password" id="password" name="password" required className={styles.input} />
        <button type="submit" className={styles.submit}>Connexion</button>
        </form>
      </div>
    </div>
  );
}
