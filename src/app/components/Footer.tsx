import React from "react";
import styles from "./Footer.module.css"; 

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>© {new Date().getFullYear()} NAS.AUTO - Tous droits réservés</p> 
        {/* j ai utilise le getfullyear afin de mettre a jour automatiquement l annee en cours a partir de Date */}
        <div className={styles.links}>
          <a href="/mentions-legales">Mentions légales</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
