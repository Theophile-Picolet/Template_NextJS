import styles from './RegisterForm.module.scss';

export default function RegisterForm() {
  return (
    <form className={styles.form}>
      <h2>Nous rejoindre</h2>
      <label htmlFor="email">Adresse e-mail</label>
      <input type="email" id="email" name="email" required className={styles.input} placeholder='Votre adresse e-mail'/>
      <label htmlFor="password">Mot de passe</label>
      <input type="password" id="password" name="password" required className={styles.input} placeholder='Votre mot de passe'/>
      <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
      <input type="password" id="confirmPassword" name="confirmPassword" required className={styles.input} placeholder='Confirmez votre mot de passe'/>
      <button type="submit" className={styles.submit}>S'inscrire</button>
    </form>
  );
}
