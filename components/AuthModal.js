import { useState } from "react";
import LoginForm from "./LoginForm";
import Modal from "./Modal";
import RegisterForm from "./RegisterForm";

function AuthModal({ toggleModal }) {
  const [login, setLogin] = useState(true);

  const toggleLogin = () => {
    setLogin((prev) => !prev);
  };

  return (
    <Modal clickClose={toggleModal}>
      {login ? <LoginForm toggleLogin={toggleLogin} /> : <RegisterForm toggleLogin={toggleLogin} />}
    </Modal>
  );
}

export default AuthModal;
