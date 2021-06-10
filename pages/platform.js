import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Pages.module.css";

export default function Platform() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Platform || Karmic</title>
        <meta name='description' content='Karmic' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <center style={{ marginTop: "18vh", fontSize: "2rem", fontWeight: "100" }}>
        Under Development
      </center>
    </div>
  );
}
