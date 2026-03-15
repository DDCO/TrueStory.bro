import { useEffect, useState } from 'react';
import { api, type User } from '../api/client';
import styles from './Leaderboard.module.css';

export function Leaderboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.users
      .list()
      .then(setUsers)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.centered}>Loading…</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.leaderboard}>
      <h1>Contributor reputation</h1>
      <p className={styles.subtitle}>
        Reputation goes up when reports are confirmed and fact-checks are correct; it goes down when claims are false or repeatedly corrected.
      </p>
      <ol className={styles.list}>
        {users.length === 0 ? (
          <li className={styles.empty}>No contributors yet.</li>
        ) : (
          users.map((u, i) => (
            <li key={u.id} className={styles.row}>
              <span className={styles.rank}>{i + 1}</span>
              <span className={styles.name}>{u.displayName || u.email || 'Unknown'}</span>
              <span className={styles.score}>{u.reputationScore.toFixed(0)}</span>
            </li>
          ))
        )}
      </ol>
    </div>
  );
}
