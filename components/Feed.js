import styles from "../styles/Feed.module.css";
import { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../config/axios";
import { CircularProgress } from "@material-ui/core";
import JoinSession from "../components/JoinSession";

function Feed() {
  const dispatch = useDispatch();
  const { loading, feed } = useSelector((state) => state.feed);

  const fetchFeed = async () => {
    dispatch({ type: "FEED_LOADING" });
    try {
      const response = await Axios().get("/api/feed");
      dispatch({ type: "FEED_FETCHED", payload: response.data.feed });
    } catch (error) {
      console.error(error.message);
      if (error?.response?.data?.error) {
        dispatch({ type: "TOAST", payload: { txt: error.response.data.message, type: "error" } });
      } else {
        dispatch({ type: "TOAST", payload: { txt: error.message, type: "error" } });
      }
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.sessionsWrapper}>
        <h5 style={{ color: "#fff", fontSize: "1.7rem", fontWeight: "500" }}>Search/Title TBA</h5>
        {loading ? (
          <CircularProgress color='secondary' size={69} thickness={2} />
        ) : (
          Children.toArray(feed.map((session) => <JoinSession session={session} />))
        )}
      </div>
    </main>
  );
}

export default Feed;
