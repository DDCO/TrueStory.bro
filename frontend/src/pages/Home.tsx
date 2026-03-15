import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type Event } from '../api/client';
import styles from './Home.module.css';

export function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.events
      .list()
      .then(setEvents)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className={styles.centered}>Loading events…</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.home}>
      <h1>Events</h1>
      <p className={styles.subtitle}>
        Each event is built from claims with evidence. No single article — a live timeline.
      </p>
      <ul className={styles.eventList}>
        {events.length === 0 ? (
          <li className={styles.empty}>No events yet. Create one via the API or add a form here.</li>
        ) : (
          events.map((event) => (
            <li key={event.id}>
              <Link to={`/event/${event.id}`} className={styles.eventCard}>
                <h2>{event.title}</h2>
                {event.description && <p>{event.description}</p>}
                <span className={styles.meta}>
                  Updated {new Date(event.updatedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
