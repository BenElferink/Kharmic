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

function CreateSessionModal({ toggleModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    date_and_time: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      new Date().getHours() + 1,
      0,
    ),
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
    dispatch({ type: "TOAST", payload: { txt: "Under Development", type: "error" } });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
          // value={new Date(formData["date_and_time"]).toISOString().replace(/.\d+Z$/g, "")}
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
