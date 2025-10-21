import styles from './LoginForm.module.scss';

export default function LoginForm() {
  return (
    <form className={styles.form}>
      <h2>Connexion</h2>
      <label htmlFor="email">Adresse e-mail</label>
      <input type="email" id="email" name="email" required className={styles.input} placeholder='Votre adresse e-mail'/>
      <label htmlFor="password">Mot de passe</label>
      <input type="password" id="password" name="password" required className={styles.input} placeholder='Votre mot de passe' />
      <button type="submit" className={styles.submit}>Valider</button>
    </form>
  );
}
