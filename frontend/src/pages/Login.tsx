import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

export function Login() {
  const { providers, loginWithGoogle, loginWithFacebook } = useAuth();
  const hasProviders = providers.google || providers.facebook;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Log in to TrueStory</h1>
        <p className={styles.subtitle}>
          Sign in or create an account using Google or Facebook. Your first login creates your contributor account.
        </p>
        {hasProviders ? (
          <div className={styles.buttons}>
            {providers.google && (
              <button type="button" onClick={loginWithGoogle} className={styles.oauthBtn}>
                Continue with Google
              </button>
            )}
            {providers.facebook && (
              <button type="button" onClick={loginWithFacebook} className={styles.oauthBtn}>
                Continue with Facebook
              </button>
            )}
          </div>
        ) : (
          <p className={styles.notConfigured}>
            Login is not configured for this site. Google or Facebook OAuth must be set up by the administrator.
          </p>
        )}
        <p className={styles.back}>
          <Link to="/">← Back to events</Link>
        </p>
      </div>
    </div>
  );
}
