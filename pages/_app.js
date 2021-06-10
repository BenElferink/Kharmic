import "../styles/globals.css";
import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";
import ToasterNotifications from "../components/ToasterNotifications";

function MyApp({ ...props }) {
  return (
    <Provider store={store}>
      <InnerApp {...props} />
    </Provider>
  );
}

function InnerApp({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.auth);

  // retrieve token from local storage (SSR cannot use window)
  useEffect(() => {
    if (window) dispatch({ type: "SET_TOKEN", payload: localStorage.getItem("token") ?? null });
  }, []);

  useEffect(() => {
    if (router.pathname !== "/" && !account) {
      router.push("/");
    }
  }, [router.pathname, account]);

  return (
    <Fragment>
      <Component {...pageProps} />
      <ToasterNotifications />
    </Fragment>
  );
}

export default MyApp;
