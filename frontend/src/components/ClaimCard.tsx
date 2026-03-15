import { useEffect, useState } from 'react';
import { api, type Claim, type User, type Evidence, type FactCheck } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { StatusBadge } from './StatusBadge';
import styles from './ClaimCard.module.css';

const FACT_CHECK_TYPES = [
  { value: 'challenge', label: 'Challenge this claim' },
  { value: 'counter_evidence', label: 'Add counter evidence' },
  { value: 'confirm', label: 'Confirm this claim' },
  { value: 'context', label: 'Add context' },
] as const;

interface ClaimCardProps {
  claim: Claim;
  author?: User;
}

export function ClaimCard({ claim, author }: ClaimCardProps) {
  const { user } = useAuth();
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [factChecks, setFactChecks] = useState<FactCheck[]>([]);
  const [aggregate, setAggregate] = useState<{ avg: number; count: number } | null>(null);
  const [factCheckType, setFactCheckType] = useState<string>('challenge');
  const [factCheckContent, setFactCheckContent] = useState('');
  const [factCheckSubmitting, setFactCheckSubmitting] = useState(false);
  const [factCheckError, setFactCheckError] = useState<string | null>(null);

  const refetchFactChecks = () => api.factChecking.byClaim(claim.id).then(setFactChecks);

  useEffect(() => {
    api.evidence.byClaim(claim.id).then(setEvidence);
    refetchFactChecks();
    api.predictions.aggregate(claim.id).then(setAggregate);
  }, [claim.id]);

  const displayName = author?.displayName ?? 'Unknown';
  const rep = author?.reputationScore ?? 0;

  return (
    <article className={styles.card}>
      <div className={styles.claimHeader}>
        <StatusBadge status={claim.status} />
        <span className={styles.meta}>
          {displayName} {author != null && <>({rep.toFixed(0)} rep)</>} · {new Date(claim.createdAt).toLocaleString()}
        </span>
      </div>
      <p className={styles.content}>{claim.content}</p>

      {evidence.length > 0 && (
        <section className={styles.section}>
          <h4>Evidence</h4>
          <ul className={styles.evidenceList}>
            {evidence.map((e) => (
              <li key={e.id}>
                <span className={styles.evidenceType}>{e.type}</span>
                {e.description && <span> — {e.description}</span>}
                {e.urlOrContent.startsWith('http') ? (
                  <a href={e.urlOrContent} target="_blank" rel="noopener noreferrer">Link</a>
                ) : (
                  <span className={styles.snippet}>{e.urlOrContent.slice(0, 80)}…</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className={styles.section}>
        <h4>Community notes</h4>
        {factChecks.length > 0 && (
          <ul className={styles.notesList}>
            {factChecks.map((fc) => (
              <li key={fc.id} className={styles[fc.type] || styles.note}>
                <strong>{fc.type.replace('_', ' ')}:</strong> {fc.content}
                {fc.user && <span className={styles.noteBy}> — {fc.user.displayName || fc.user.email || 'Unknown'}</span>}
              </li>
            ))}
          </ul>
        )}
        {user ? (
          <form
            className={styles.factCheckForm}
            onSubmit={async (e) => {
              e.preventDefault();
              if (!factCheckContent.trim()) return;
              setFactCheckError(null);
              setFactCheckSubmitting(true);
              try {
                await api.factChecking.create({
                  claimId: claim.id,
                  userId: user.id,
                  type: factCheckType as 'challenge' | 'counter_evidence' | 'confirm' | 'context',
                  content: factCheckContent.trim(),
                });
                setFactCheckContent('');
                await refetchFactChecks();
              } catch (err) {
                setFactCheckError(err instanceof Error ? err.message : 'Failed to submit');
              } finally {
                setFactCheckSubmitting(false);
              }
            }}
          >
            <select
              value={factCheckType}
              onChange={(e) => setFactCheckType(e.target.value)}
              className={styles.factCheckSelect}
            >
              {FACT_CHECK_TYPES.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <textarea
              value={factCheckContent}
              onChange={(e) => setFactCheckContent(e.target.value)}
              placeholder="Your note or evidence (e.g. link, quote, explanation)..."
              rows={3}
              className={styles.factCheckTextarea}
              disabled={factCheckSubmitting}
            />
            {factCheckError && <p className={styles.factCheckError}>{factCheckError}</p>}
            <button type="submit" disabled={factCheckSubmitting || !factCheckContent.trim()} className={styles.factCheckSubmit}>
              {factCheckSubmitting ? 'Submitting…' : 'Submit note'}
            </button>
          </form>
        ) : (
          <p className={styles.loginPrompt}>Log in to challenge this claim, add counter evidence, or add context.</p>
        )}
      </section>

      {aggregate != null && aggregate.count > 0 && (
        <section className={styles.section}>
          <h4>Prediction market</h4>
          <p className={styles.aggregate}>
            Crowd probability this claim is true: <strong>{aggregate.avg.toFixed(0)}%</strong> ({aggregate.count} prediction{aggregate.count !== 1 ? 's' : ''})
          </p>
        </section>
      )}
    </article>
  );
}
