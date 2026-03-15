import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api, type Event, type Claim, type User } from '../api/client';
import { ClaimCard } from '../components/ClaimCard';
import styles from './EventPage.module.css';

export function EventPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [confirmCount, setConfirmCount] = useState<number | null>(null);
  const [userConfirmed, setUserConfirmed] = useState<boolean | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    Promise.all([api.events.get(id), api.claims.byEvent(id), api.users.list()])
      .then(([ev, cl, userList]) => {
        setEvent(ev);
        setClaims(cl);
        const map: Record<string, User> = {};
        userList.forEach((u) => (map[u.id] = u));
        setUsers(map);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    api.events.confirmationCount(id).then((r) => setConfirmCount(r.count));
    if (user) {
      api.events.hasConfirmed(id).then((r) => setUserConfirmed(r.confirmed)).catch(() => setUserConfirmed(false));
    } else {
      setUserConfirmed(false);
    }
  }, [id, user]);

  const handleConfirm = async () => {
    if (!id || !event || event.status === 'confirmed') return;
    setConfirming(true);
    try {
      const result = await api.events.confirm(id);
      setEvent(result.event);
      setConfirmCount(result.count);
      setUserConfirmed(true);
    } finally {
      setConfirming(false);
    }
  };

  if (loading) return <div className={styles.centered}>Loading…</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!event) return <div className={styles.centered}>Event not found.</div>;

  return (
    <div className={styles.eventPage}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1>{event.title}</h1>
          <span className={event.status === 'confirmed' ? styles.badgePublic : styles.badgeUnverified}>
            {event.status === 'confirmed' ? 'Public' : 'Unverified'}
          </span>
        </div>
        {event.description && <p className={styles.description}>{event.description}</p>}
        {event.status === 'unverified' && (
          <div className={styles.confirmSection}>
            <p className={styles.confirmText}>
              {confirmCount != null && (
                <>This event needs 3 confirmations to become public. {confirmCount} so far.</>
              )}
            </p>
            {user && userConfirmed === false && (
              <button
                type="button"
                onClick={handleConfirm}
                disabled={confirming}
                className={styles.confirmBtn}
              >
                {confirming ? 'Confirming…' : 'I confirm this event'}
              </button>
            )}
            {user && userConfirmed === true && (
              <span className={styles.confirmedLabel}>You confirmed this event.</span>
            )}
            {!user && (
              <p className={styles.confirmLogin}>Log in to confirm this event.</p>
            )}
          </div>
        )}
      </div>
      <section className={styles.timeline}>
        <h2>Timeline of reports</h2>
        <p className={styles.hint}>
          Each item is a claim with evidence. Labels: Unverified → Evidence provided → Multiple confirmations → Confirmed.
        </p>
        {claims.length === 0 ? (
          <p className={styles.empty}>No claims yet for this event.</p>
        ) : (
          <ol className={styles.claimList}>
            {claims.map((claim) => (
              <li key={claim.id}>
                <ClaimCard claim={claim} author={users[claim.authorId]} />
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
