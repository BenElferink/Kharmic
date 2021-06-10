import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import { Button } from "@material-ui/core";
import MicSVG from "./MicSVG";
import styles from "../styles/Header.module.css";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const clickLogo = () => {
    router.push("/");
  };

  const clickLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={`flex-row ${styles.container}`}>
      <div className={`flex-row ${styles.logo}`} onClick={clickLogo}>
        <MicSVG size='22' />
        <h1>Kharmic</h1>
      </div>

      {auth.account && (
        <Button className={styles.logout} onClick={clickLogout}>
          Logout
        </Button>
      )}
    </header>
  );
}
