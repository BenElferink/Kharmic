import styles from "../styles/Form.module.css";
import btnStyles from "../styles/Buttons.module.css";
import { Children, useState } from "react";
import { useDispatch } from "react-redux";
import { categories } from "../data/categories";
import Modal from "./Modal";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
} from "@material-ui/core";

const defaultDate = `${new Date().getFullYear()}-01-01T00:00`;

function CreateSessionModal({ toggleModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    date_and_time: new Date(defaultDate),
  });

  // change input data
  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "date_and_time") value = new Date(value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch({ type: "TOAST", payload: { txt: "Sending payload...", type: "loading" } });

    setTimeout(() => {
      setLoading(false);
      dispatch({ type: "TOAST", payload: { txt: "Under Development", type: "error" } });
    }, 1000);
  };

  return (
    <Modal clickClose={toggleModal}>
      <form onSubmit={handleSubmit} className={`${styles.form}`}>
        <h6 className={styles.title}>Create a Session</h6>

        <FormControl required variant='outlined' className={styles.inp}>
          <InputLabel htmlFor='category'>Category</InputLabel>
          <Select
            id='category'
            name='category'
            value={formData["category"]}
            onChange={handleChange}
            labelWidth={70}>
            {Children.toArray(categories.map((cat) => <MenuItem value={cat}>{cat}</MenuItem>))}
          </Select>
        </FormControl>

        {formData["category"] === "Other" && (
          <TextField
            label='"Other" description'
            name='category_other'
            value={formData["category_other"] ?? ""}
            onChange={handleChange}
            required={formData["category"] === "Other"}
            variant='outlined'
            className={styles.inp}
          />
        )}

        <TextField
          label='Date and Time'
          name='date_and_time'
          type='datetime-local'
          defaultValue={defaultDate}
          onChange={handleChange}
          required
          variant='outlined'
          className={styles.inp}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <div className={`${styles.btnWrap}`}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button
              variant='contained'
              className={`${styles.btn} ${btnStyles.blueRadient}`}
              type='submit'>
              Submit
            </Button>
          )}
        </div>
      </form>
    </Modal>
  );
}

export default CreateSessionModal;
