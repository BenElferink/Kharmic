import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

export default function ToasterNotifications() {
  const dispatch = useDispatch();
  const { txt, type } = useSelector((state) => state.toast);

  const options = {
    style: {
      minWidth: "300px",
      padding: "1rem",
      backgroundColor: "#f5f5f5",
      bordeRadius: "4px",
      color: "#0a0a0a",
      fontSize: "1.1rem",
    },
    duration: 4000,
  };

  useEffect(() => {
    if (txt && type) {
      toast[type](txt, options);
      dispatch({ type: "TOAST", payload: { type: "", txt: "" } });
    }
    // eslint-disable-next-line
  }, [txt, type]);

  return <Toaster position='top-left' reverseOrder={true} />;
}
