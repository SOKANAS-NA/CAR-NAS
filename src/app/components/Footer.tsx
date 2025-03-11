import React from "react";
import styles from "./Footer.module.css"; // Import du CSS module

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} Mon Site - Tous droits réservés</p>
        <div className={styles.links}>
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
