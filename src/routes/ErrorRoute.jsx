import { useRouteError, NavLink } from 'react-router-dom';
import Results from '../components/results/Results';
import styles from './ErrorRoute.module.css'

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Results
      mainHeading='Oops!'
      mainParagraph='Sorry, an unexpected error has occurred.'
    >
      <p className={styles.errorMessage} aria-live='polite'>
        <i>{error.statusText || error.message}</i>
      </p>
      <div className={styles.returnToHomeWrapper}>
        <NavLink className={styles.returnToHome} to={'/'} aria-label="return to home" role="button">Return to Home</NavLink>
      </div>
    </Results>
  );
}
