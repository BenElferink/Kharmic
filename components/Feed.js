import styles from "../styles/Feed.module.css";
import btnStyles from "../styles/Buttons.module.css";
import { Children, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Axios from "../config/axios";
import { Button, CircularProgress } from "@material-ui/core";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";

const FAKE = [
  {
    participants: [],
    category: "Business Advice",
    category_other: "",
    date_and_time: "2021-06-16T06:00:00.000+00:00",
  },
  {
    participants: [],
    category: "Other",
    category_other: "Cryptocurrencies",
    date_and_time: "2021-06-16T04:20:00.000+00:00",
  },
  {
    participants: [],
    category: "Relationships",
    category_other: "",
    date_and_time: "2021-06-16T11:00:00.000+00:00",
  },
  {
    participants: [],
    category: "Ideas",
    category_other: "",
    date_and_time: "2021-06-16T11:30:00.000+00:00",
  },
];

function Feed() {
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([...FAKE]);

  const fetchFeed = async (e) => {
    setLoading(true);
    try {
      const response = await Axios().get("/api/feed");
      setFeed((prev) => [...prev, ...response.data.feed]);
    } catch (error) {
      console.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.sessionsWrapper}>
        {loading ? (
          <CircularProgress className={styles.loading} size={69} thickness={2} />
        ) : (
          Children.toArray(feed.map((session) => <JoinSession session={session} />))
        )}
      </div>
    </main>
  );
}

function JoinSession({ session }) {
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);

  const clickJoin = () => {
    dispatch({ type: "TOAST", payload: { txt: "Under Development", type: "error" } });
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
      <Button className={btnStyles.joinSess} onClick={clickJoin}>
        Join
      </Button>
    </article>
  );
}

export default Feed;
