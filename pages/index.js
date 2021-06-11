import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className={`page`}>
      <Head>
        <title>Home || Karmic</title>
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
