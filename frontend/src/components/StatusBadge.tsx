import type { ClaimStatus } from '../api/client';
import styles from './StatusBadge.module.css';

const LABELS: Record<ClaimStatus, string> = {
  unverified: 'Unverified',
  evidence_provided: 'Evidence provided',
  multiple_confirmations: 'Multiple confirmations',
  confirmed: 'Confirmed',
};

const STATUS_CLASS: Record<ClaimStatus, string> = {
  unverified: styles.unverified,
  evidence_provided: styles.evidence,
  multiple_confirmations: styles.multiple,
  confirmed: styles.confirmed,
};

interface StatusBadgeProps {
  status: ClaimStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${STATUS_CLASS[status] ?? ''}`}>
      {LABELS[status] ?? status}
    </span>
  );
}
