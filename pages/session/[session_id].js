import btnStyles from "../../styles/Buttons.module.css";
import { Fragment, useState, useEffect, Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Axios from "../../config/axios";
import Head from "next/head";
import Header from "../../components/Header";
import { Button, CircularProgress } from "@material-ui/core";
import LionSVG from "../../icons/LionSVG";
import OwlSVG from "../../icons/OwlSVG";

export default function SessionPage() {
  const router = useRouter();
  const session_id = router.query.session_id;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState({});

  const fetchSession = async () => {
    setLoading(true);
    try {
      const response = await Axios(token).get("/api/session/" + session_id);
      setSession(response.data.session);
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

  useEffect(() => {
    if (session_id) fetchSession();
  }, [session_id, token]);

  const clickTime = () => {
    dispatch({ type: "TOAST", payload: { txt: "Under development", type: "error" } });
  };

  const clickTalk = () => {
    dispatch({ type: "TOAST", payload: { txt: "Under development", type: "error" } });
  };

  return (
    <div className={`page`}>
      <Head>
        <title>Session || Karmic</title>
        <meta name='description' content='Karmic' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />

      <center>
        {loading ? (
          <CircularProgress />
        ) : (
          <Fragment>
            <div>
              <h4 style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                {session.main_category} - {session.sub_category}
              </h4>

              <div
                style={{
                  width: "200px",
                  height: "200px",
                  margin: "22px auto",
                  background: "url('/images/greek_ring.png') no-repeat center",
                  backgroundSize: "contain",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  opacity: "0.5",
                }}>
                <LionSVG
                  size='60'
                  style={{
                    position: "absolute",
                    top: "3%",
                    left: "3%",
                    background: "white",
                    borderRadius: "100%",
                  }}
                />
                <label>Time left</label>
                <span style={{ fontSize: "3rem", fontWeight: "600" }}>03:54</span>
              </div>

              <h6 style={{ fontSize: "1rem", fontWeight: "500" }}>CHAPTER I</h6>
              <h5 style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                {session.host?.display_name} is talking
              </h5>
            </div>

            <div
              style={{
                maxWidth: "330px",
                margin: "22px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Button className={btnStyles.white} onClick={clickTime}>
                Give time
              </Button>
              <Button className={btnStyles.blueRadient} onClick={clickTalk}>
                Ask to speak
              </Button>
            </div>

            <div
              style={{
                minHeight: "42vh",
                background: "var(--gradient-blue-bottom)",
                color: "var(--beige)",
                borderRadius: "50% 50% 0 0",
              }}>
              <div
                style={{
                  maxWidth: "420px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                {Children.toArray(
                  session.participants?.map((partici) => (
                    <div
                      style={{
                        margin: "25px auto 50px auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}>
                      <OwlSVG
                        color='black'
                        size='50'
                        style={{ background: "white", borderRadius: "100%" }}
                      />
                      <span style={{ fontSize: "0.7rem", textShadow: "-1px 1px 1px black" }}>
                        {partici.display_name}
                      </span>
                    </div>
                  )),
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h6 style={{ marginBottom: "22px" }}>TRANSCRIPT</h6>
                <ul style={{ textAlign: "left", listStyleType: "none" }}>
                  <li style={{ marginBottom: "7px", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    <span style={{ marginRight: "11px" }}>05:12</span>{" "}
                    <span style={{ color: "var(--blue-light)" }}>Test1</span> extended{" "}
                    <span style={{ color: "var(--blue-light)" }}>Kharmic Developer</span>'s time
                  </li>
                  <li style={{ marginBottom: "7px", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    <span style={{ marginRight: "11px" }}>05:12</span>{" "}
                    <span style={{ color: "var(--blue-light)" }}>Test2</span> asked to speak and is
                    #1 in queue
                  </li>
                  <li style={{ marginBottom: "7px", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                    <span style={{ marginRight: "11px" }}>05:12</span>{" "}
                    <span style={{ color: "var(--blue-light)" }}>Test4</span> extended{" "}
                    <span style={{ color: "var(--blue-light)" }}>Kharmic Developer</span>'s time
                  </li>
                </ul>
              </div>
            </div>
          </Fragment>
        )}
      </center>
    </div>
  );
}
