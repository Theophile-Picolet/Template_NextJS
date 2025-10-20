'use client';
import styles from './page.module.scss';
import Link from 'next/link'; 
import { useState } from 'react';
import LoginModal from '@/components/LoginModal';
import RegisterModal from '@/components/RegisterModal'; 
export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className={styles.header}>
      <div className="header-container">
        <button type='button' onClick={() => setShowLogin(true)}>Se connecter</button>
        <button type='button' onClick={() => setShowRegister(true)}>Nous rejoindre</button>
      </div>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </header>
  );
}