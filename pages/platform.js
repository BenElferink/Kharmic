import Head from "next/head";
import Header from "../components/Header";
import LaunchOrCreate from "../components/LaunchOrCreate";

export default function Platform() {
  return (
    <div className={`page`}>
      <Head>
        <title>Platform || Karmic</title>
        <meta name='description' content='Karmic' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <LaunchOrCreate />
      <div className='temp' />
    </div>
  );
}
