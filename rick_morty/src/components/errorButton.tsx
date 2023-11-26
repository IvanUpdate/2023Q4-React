import styles from './errorButton.module.css'

export default function ErrorButton() {
  return (
    <div
      className={styles.error}
      onClick={() => dispatch(setError(new Error()))}
    >
      <p>Throw Error</p>
    </div>
  );
}
