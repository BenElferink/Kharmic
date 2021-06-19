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
  const isJoined = session.participants.includes(account?._id);

  const [loading, setLoading] = useState(false);

  const clickJoin = async () => {
    setLoading(true);
    dispatch({ type: "TOAST", payload: { txt: "Sending payload...", type: "loading" } });
    const body = { session_id: session._id };

    try {
      const response = await Axios(token).post(
        // join/unjoin session
        isJoined ? "/api/session/unjoin" : "/api/session/join",
        body,
      );
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
      ) : (
        <Button
          className={isJoined ? btnStyles.unjoinSess : btnStyles.joinSess}
          onClick={clickJoin}>
          {isJoined ? "EXIT" : "JOIN"}
        </Button>
      )}
    </article>
  );
}

export default JoinSession;
