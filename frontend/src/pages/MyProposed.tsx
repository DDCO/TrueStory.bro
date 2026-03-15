import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api, type Event } from '../api/client';
import styles from './MyProposed.module.css';

export function MyProposed() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    api.events
      .proposed()
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className={styles.page}>
        <p className={styles.muted}>Log in to see your proposed events.</p>
      </div>
    );
  }

  if (loading) return <div className={styles.centered}>Loading…</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.page}>
      <h1>My proposed events</h1>
      <p className={styles.subtitle}>
        Events you proposed. Unverified events need 3 community confirmations to become public.
      </p>
      {events.length === 0 ? (
        <p className={styles.empty}>You haven’t proposed any events yet. <Link to="/propose">Propose one</Link>.</p>
      ) : (
        <ul className={styles.list}>
          {events.map((event) => (
            <li key={event.id}>
              <Link to={`/event/${event.id}`} className={styles.card}>
                <span className={event.status === 'confirmed' ? styles.badgeConfirmed : styles.badgeUnverified}>
                  {event.status === 'confirmed' ? 'Public' : 'Unverified'}
                </span>
                <h2>{event.title}</h2>
                <span className={styles.meta}>
                  Updated {new Date(event.updatedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
