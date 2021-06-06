import { useRouter } from "next/router";
import MicSVG from "./MicSVG";
import styles from "../styles/Header.module.css";

export default function Header() {
  const router = useRouter();

  const clickLogo = () => {
    router.push("/");
  };

  return (
    <header className={`flex-row ${styles.container}`}>
      <div className={`flex-row ${styles.logo}`} onClick={clickLogo}>
        <MicSVG size='22' />
        <h1>Kharmic</h1>
      </div>
    </header>
  );
}
