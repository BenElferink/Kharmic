import { TextField, Button } from "@material-ui/core";
import styles from "../styles/Form.module.css";

function RegisterForm({ toggleLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Under Development");
  };

  return (
    <form onSubmit={handleSubmit} className={`flex-column ${styles.form}`}>
      <h6 className={styles.title}>Register</h6>

      <TextField label='Username' variant='outlined' className={styles.inp} />
      <TextField label='Password' variant='outlined' className={styles.inp} />
      <TextField label='Confirm Password' variant='outlined' className={styles.inp} />

      <div className={`flex-row ${styles.btnWrap}`}>
        <Button variant='contained' className={styles.btn} type='submit'>
          Submit
        </Button>
        <Button variant='outlined' className={styles.btn} onClick={toggleLogin}>
          Login
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
