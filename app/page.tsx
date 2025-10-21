'use client';
import styles from './page.module.scss';
import Link from 'next/link'; 
import { useState } from 'react';
import Modal from '@/components/Modal';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
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
    </header>
    <main className={styles.main}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </main>
    </body>
   
  );
}