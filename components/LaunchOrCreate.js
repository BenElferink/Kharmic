import styles from "../styles/LaunchOrCreate.module.css";
import btnStyles from "../styles/Buttons.module.css";
import LionSVG from "./LionSVG";
import OwlSVG from "./OwlSVG";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

function LaunchOrCreate() {
  const dispatch = useDispatch();
  const clickCreate = () => {
    dispatch({ type: "TOAST", payload: { txt: "Under Development", type: "error" } });
  };

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
            onClick={clickCreate}>
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
    </div>
  );
}

export default LaunchOrCreate;
