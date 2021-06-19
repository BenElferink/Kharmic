import styles from "../styles/Feed.module.css";
import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../config/axios";
import { useMediaQuery, CircularProgress, IconButton } from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import JoinSession from "../components/JoinSession";

function Feed() {
  const dispatch = useDispatch();
  const { loading, feed } = useSelector((state) => state.feed);
  const { account } = useSelector((state) => state.auth);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isOpen, setIsOpen] = useState(false);
  const clickMobileArrow = () => setIsOpen((prev) => !prev);

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

  if (isMobile) {
    return (
      <main className={styles.container}>
        {/* Booked sessions - Mobile */}
        <aside
          className={`${styles.sideElem} ${isOpen ? styles.open : !isOpen ? styles.closed : ""}`}>
          <div className={styles.arrowBtnWrap}>
            <IconButton className={styles.arrowBtn} onClick={clickMobileArrow}>
              {isOpen ? <ArrowBackIosRoundedIcon /> : <ArrowForwardIosRoundedIcon />}
            </IconButton>
          </div>

          <div className={`scroll ${styles.sessionsWrapper}`}>
            <h5 className={styles.title}>Booked Sessions</h5>

            {account && account.sessions.length ? (
              Children.toArray(account.sessions.map((session) => <JoinSession session={session} />))
            ) : account && !account.sessions.length ? (
              <span className={styles.noSession}>No sessions here...</span>
            ) : (
              <span className={styles.noSession}>Login to view booked sessions</span>
            )}
          </div>
        </aside>

        {/* Join sessions */}
        <div className={styles.sessionsWrapper}>
          <h5 className={styles.title}>Search/Title TBA</h5>

          {loading ? (
            <CircularProgress color='secondary' size={69} thickness={2} />
          ) : !feed.length ? (
            <span className={styles.noSession}>No sessions here...</span>
          ) : (
            Children.toArray(feed.map((session) => <JoinSession session={session} />))
          )}
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      {/* Booked sessions - Desktop */}
      <div className={styles.sessionsWrapper}>
        <h5 className={styles.title}>Booked Sessions</h5>

        {account && account.sessions.length ? (
          Children.toArray(account.sessions.map((session) => <JoinSession session={session} />))
        ) : account && !account.sessions.length ? (
          <span className={styles.noSession}>No sessions here...</span>
        ) : (
          <span className={styles.noSession}>Login to view booked sessions</span>
        )}
      </div>

      {/* Join sessions */}
      <div className={styles.sessionsWrapper}>
        <h5 className={styles.title}>Search/Title TBA</h5>

        {loading ? (
          <CircularProgress color='secondary' size={69} thickness={2} />
        ) : !feed.length ? (
          <span className={styles.noSession}>No sessions here...</span>
        ) : (
          Children.toArray(feed.map((session) => <JoinSession session={session} />))
        )}
      </div>
    </main>
  );
}

export default Feed;
