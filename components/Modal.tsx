import type React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button type="button" className={styles.close} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}
