import { TextField, Button } from "@material-ui/core";
import styles from "../styles/Form.module.css";

function LoginForm({ toggleLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Under Development");
  };

  return (
    <form onSubmit={handleSubmit} className={`flex-column ${styles.form}`}>
      <h6 className={styles.title}>Login</h6>

      <TextField label='Username' variant='outlined' className={styles.inp} />
      <TextField label='Password' variant='outlined' className={styles.inp} />

      <div className={`flex-row ${styles.btnWrap}`}>
        <Button variant='contained' className={styles.btn} type='submit'>
          Submit
        </Button>
        <Button variant='outlined' className={styles.btn} onClick={toggleLogin}>
          Register
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
