import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import type { User } from '../api/client';
import { handleAuthCallback } from '../contexts/AuthContext';
import styles from './DevLogin.module.css';

export function DevLogin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.users
      .list()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const loginAs = async (userId: string) => {
    setError(null);
    setSubmitting(true);
    try {
      const { access_token } = await api.auth.devLogin(userId);
      handleAuthCallback(access_token);
      navigate('/', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Dev login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Dev login</h1>
        <p className={styles.subtitle}>
          Log in as an existing user. Only available when running locally (no OAuth required).
        </p>
        {loading ? (
          <p className={styles.muted}>Loading users…</p>
        ) : error && users.length === 0 ? (
          <p className={styles.error}>{error}</p>
        ) : users.length === 0 ? (
          <p className={styles.muted}>No users yet. Create one via the API (e.g. POST /api/users).</p>
        ) : (
          <ul className={styles.userList}>
            {users.map((u) => (
              <li key={u.id}>
                <button
                  type="button"
                  onClick={() => loginAs(u.id)}
                  disabled={submitting}
                  className={styles.userBtn}
                >
                  {u.displayName || u.email || u.id.slice(0, 8)} {u.email && <span className={styles.email}>({u.email})</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
        {error && users.length > 0 && <p className={styles.error}>{error}</p>}
        <p className={styles.back}>
          <Link to="/">← Back to events</Link>
        </p>
      </div>
    </div>
  );
}
