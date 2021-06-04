import styles from "../styles/Banner.module.css";

const h2Text = "Anonymous Voice Protocol";
const h3Text = "Gain +Karma by helping other people";

export default function Banner() {
  const clickLaunch = () => {
    alert("Under Development");
  };

  return (
    <div className={`flex-column ${styles.container}`}>
      <h2 className={styles.glitch}>
        <span aria-hidden='true'>{h2Text}</span>
        {h2Text}
        <span aria-hidden='true'>{h2Text}</span>
      </h2>
      <h3 className={styles.glitch}>
        <span aria-hidden='true'>{h3Text}</span>
        {h3Text}
        <span aria-hidden='true'>{h3Text}</span>
      </h3>

      <button className={`${styles.glitch} ${styles.launch}`} onClick={clickLaunch}>
        Launch App
      </button>
    </div>
  );
}
