import Head from "next/head";
import Header from "../components/Header";
import LaunchOrCreate from "../components/LaunchOrCreate";

export default function Home() {
  return (
    <div className={`page`}>
      <Head>
        <title>Home || Karmic</title>
        <meta name='description' content='Karmic' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <LaunchOrCreate />
      <div className='temp' />
    </div>
  );
}
