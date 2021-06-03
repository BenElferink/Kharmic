import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Karmic</title>
        <meta name='description' content='Karmic' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <Banner />
    </div>
  );
}
