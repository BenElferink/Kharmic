import "../styles/globals.css";
import { Fragment, useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
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
  const dispatch = useDispatch();

  // retrieve token from local storage (SSR cannot use window)
  useEffect(() => {
    if (window) dispatch({ type: "SET_TOKEN", payload: localStorage.getItem("token") ?? null });
  }, []);

  return (
    <Fragment>
      <Component {...pageProps} />
      <ToasterNotifications />
    </Fragment>
  );
}

export default MyApp;
