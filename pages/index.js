import { useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Banner from "../components/Banner";
import AuthModal from "../components/AuthModal";
import styles from "../styles/Pages.module.css";

export default function Home() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Home || Karmic</title>
        <meta name='description' content='Karmic' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <Banner toggleModal={toggleModal} />
      {modal && <AuthModal toggleModal={toggleModal} />}
    </div>
  );
}
