import styles from "../styles/Feed.module.css";
import btnStyles from "../styles/Buttons.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Axios from "../config/axios";
import { Button, CircularProgress } from "@material-ui/core";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";

function JoinSession({ session }) {
  const dispatch = useDispatch();
  const { account, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const timeDiff = Date.now() - new Date(session.date_and_time);
  const isHost = session.host === account?._id;
  const isHostAndStart = isHost && timeDiff >= 0;
  const isHostNoStart = isHost && timeDiff < 0;
  const isJoined = session.participants.includes(account?._id);
  const isFull = session.participants.length === 5 && !isJoined && !isHost;
  const notLoggedIn = () => {
    dispatch({ type: "TOAST", payload: { txt: "Please login", type: "error" } });
  };

  const clickJoin = async () => {
    setLoading(true);
    dispatch({ type: "TOAST", payload: { txt: "Sending payload...", type: "loading" } });
    try {
      const response = await Axios(token).post("/api/session/join", { session_id: session._id });
      dispatch({ type: "SESSION_UPDATED", payload: response.data.session });
      dispatch({ type: "ACCOUNT_UPDATED", payload: response.data.account });
      dispatch({ type: "TOAST", payload: { txt: response.data.message, type: "success" } });
    } catch (error) {
      console.error(error.message);
      if (error?.response?.data?.error) {
        dispatch({ type: "TOAST", payload: { txt: error.response.data.message, type: "error" } });
      } else {
        dispatch({ type: "TOAST", payload: { txt: error.message, type: "error" } });
      }
    }
    setLoading(false);
  };

  const clickUnjoin = async () => {
    setLoading(true);
    dispatch({ type: "TOAST", payload: { txt: "Sending payload...", type: "loading" } });
    try {
      const response = await Axios(token).post("/api/session/unjoin", { session_id: session._id });
      dispatch({ type: "SESSION_UPDATED", payload: response.data.session });
      dispatch({ type: "ACCOUNT_UPDATED", payload: response.data.account });
      dispatch({ type: "TOAST", payload: { txt: response.data.message, type: "success" } });
    } catch (error) {
      console.error(error.message);
      if (error?.response?.data?.error) {
        dispatch({ type: "TOAST", payload: { txt: error.response.data.message, type: "error" } });
      } else {
        dispatch({ type: "TOAST", payload: { txt: error.message, type: "error" } });
      }
    }
    setLoading(false);
  };

  const clickHostStart = () => {
    dispatch({ type: "TOAST", payload: { txt: "Under development", type: "error" } });
  };

  const clickHostKill = () => {
    dispatch({ type: "TOAST", payload: { txt: "Under development", type: "error" } });
  };

  return (
    <article className={styles.session}>
      <table>
        <thead>
          <tr className={styles.row1}>
            <th>Time</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.row2}>
            <td>{moment(new Date(session.date_and_time)).format("H:mm")}</td>
            <td>{session.category}</td>
          </tr>
          <tr className={styles.row3}>
            <td>
              <PeopleAltRoundedIcon fontSize='small' />
              {session.participants.length + 1}/6
            </td>
            <td> {session.category === "Other" ? session.category_other : ""}</td>
          </tr>
        </tbody>
      </table>

      {loading ? (
        <CircularProgress color='secondary' />
      ) : isFull ? (
        <Button className={btnStyles.joinSess} onClick={() => null} disabled={true}>
          FULL
        </Button>
      ) : isHostAndStart ? (
        <Button className={btnStyles.joinSess} onClick={account ? clickHostStart : notLoggedIn}>
          START
        </Button>
      ) : isHostNoStart ? (
        <Button className={btnStyles.unjoinSess} onClick={account ? clickHostKill : notLoggedIn}>
          KILL
        </Button>
      ) : isJoined ? (
        <Button className={btnStyles.unjoinSess} onClick={account ? clickUnjoin : notLoggedIn}>
          EXIT
        </Button>
      ) : (
        <Button className={btnStyles.joinSess} onClick={account ? clickJoin : notLoggedIn}>
          JOIN
        </Button>
      )}
    </article>
  );
}

export default JoinSession;
