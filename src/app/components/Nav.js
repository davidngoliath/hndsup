import styles from '../styles/page.module.css';
import "../globals.css";

export default function Nav({ scrollToSection, videoRef, productRef, statsRef, actionRef }) {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.pageLinks}>
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(videoRef); }}>VIDEO</a>
        </div>
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(productRef); }}>EXPLORE PRODUCTS</a>
        </div>
        <div>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(statsRef); }}>STATISTICS</a>
        </div>
      </div>
      <div className={styles.takeAction}>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection(actionRef); }}>TAKE ACTION</a>
      </div>
    </nav>
  );
}
