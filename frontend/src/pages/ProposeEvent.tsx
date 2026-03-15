import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/client';
import styles from './ProposeEvent.module.css';

function slugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function ProposeEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSlug = (newTitle: string) => {
    setTitle(newTitle);
    setSlug(slugFromTitle(newTitle));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      const event = await api.events.create({
        title: title.trim(),
        slug: slug.trim(),
        description: description.trim() || undefined,
      });
      navigate(`/event/${event.id}`, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to propose event');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <p className={styles.muted}>Log in to propose an event.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Propose an event</h1>
        <p className={styles.subtitle}>
          New events start as unverified and become public after 3 community confirmations. High-reputation or verified reporters publish immediately.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => updateSlug(e.target.value)}
              placeholder="e.g. Bridge collapse in Lisbon"
              required
              maxLength={300}
              className={styles.input}
            />
          </label>
          <label>
            URL slug (used in links)
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="bridge-collapse-lisbon"
              required
              maxLength={200}
              className={styles.input}
            />
          </label>
          <label>
            Description (optional)
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief context..."
              rows={3}
              className={styles.textarea}
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" disabled={submitting} className={styles.submit}>
            {submitting ? 'Submitting…' : 'Propose event'}
          </button>
        </form>
      </div>
    </div>
  );
}
