import styles from "../styles/LaunchOrCreate.module.css";
import btnStyles from "../styles/Buttons.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LionSVG from "../icons/LionSVG";
import OwlSVG from "../icons/OwlSVG";
import CreateSessionModal from "../components/CreateSessionModal";
import { Button } from "@material-ui/core";

function LaunchOrCreate() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);
  const notLoggedIn = () => {
    dispatch({ type: "TOAST", payload: { txt: "Please Login", type: "error" } });
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal((prev) => !prev);

  return (
    <div className={styles.container}>
      <div className={styles.lionArtWrap}>
        <article className={styles.lionArt}>
          <LionSVG />
          <h3>Create a Session</h3>
          <p>It takes courage to ask others for help</p>

          <Button
            className={btnStyles.blueRadient}
            style={{ marginTop: "11px" }}
            onClick={account ? toggleModal : notLoggedIn}>
            Create
          </Button>
        </article>
      </div>

      <div className={styles.owlArtWrap}>
        <article className={styles.owlArt}>
          <OwlSVG />
          <h3>Join a Session</h3>
          <p>Share your wisdom and help others</p>
        </article>
      </div>

      {modal && <CreateSessionModal toggleModal={toggleModal} />}
    </div>
  );
}

export default LaunchOrCreate;
