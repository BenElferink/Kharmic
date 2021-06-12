import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/authActions";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthModal({ toggleModal }) {
  const dispatch = useDispatch();
  const { account, token, loading } = useSelector((state) => state.auth);
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => {
    setIsLogin((prev) => !prev);
  };

  useEffect(() => {
    if (account && !loading) {
      // go to main app
      toggleModal();
    } else if (token && !loading) {
      // try to login
      dispatch(login());
    }
  }, [account, token, loading]);

  return (
    <Modal clickClose={toggleModal}>
      {isLogin ? (
        <LoginForm toggleLogin={toggleLogin} />
      ) : (
        <RegisterForm toggleLogin={toggleLogin} />
      )}
    </Modal>
  );
}

export default AuthModal;
