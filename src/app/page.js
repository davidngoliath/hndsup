import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav className={styles.navContainer}>
          <div className={styles.pageLinks}>
            <div>
              <a href="/">VIDEO</a>
            </div>
            <div>
              <a href="/">EXPLORE PRODUCTS</a>
            </div>
            <div>
              <a href="/">STATISTICS</a>
            </div>
          </div>
          <div className={styles.takeAction}>
            <a href="/">TAKE ACTION</a>
          </div>
        </nav>
        <section className={styles.heroContainer}>
          <div>
            <Image src="/images/circleblur.png" alt="hero" width={3024} height={2744} className={styles.blur}/>
          </div>
          <div className={styles.heroTitle}>
            <div>
            </div>
            <div className={styles.fistContainer}>
              <Image src="/images/fist.png" alt="fist" width={1063} height={1516} className={styles.fistImage}/>
            </div>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}
