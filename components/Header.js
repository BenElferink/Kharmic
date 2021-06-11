import styles from "../styles/Header.module.css";
import btnStyles from "../styles/Buttons.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/authActions";
import MicSVG from "./MicSVG";
import AuthModal from "./AuthModal";
import { Button } from "@material-ui/core";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);

  const clickLogo = () => {
    router.push("/");
  };

  const clickLogout = () => {
    dispatch(logout());
  };

  const toggleModal = () => {
    setModal((prev) => !prev);
  };

  return (
    <header className={`${styles.container}`}>
      <div className={`${styles.logo}`} onClick={clickLogo}>
        <MicSVG size='22' />
        <h1>Kharmic</h1>
      </div>

      {auth.account ? (
        <Button className={`${btnStyles.blueRadient}`} onClick={clickLogout}>
          Logout
        </Button>
      ) : (
        <Button className={`${btnStyles.blueRadient}`} onClick={toggleModal}>
          Login
        </Button>
      )}

      {modal && !auth.account && <AuthModal toggleModal={toggleModal} />}
    </header>
  );
}
