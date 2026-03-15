import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { User } from '../../users/entities/user.entity';
import { Evidence } from '../../evidence/entities/evidence.entity';
import { FactCheck } from '../../fact-checking/entities/fact-check.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

export enum ClaimStatus {
  Unverified = 'unverified',
  EvidenceProvided = 'evidence_provided',
  MultipleConfirmations = 'multiple_confirmations',
  Confirmed = 'confirmed',
}

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  authorId: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'enum', enum: ClaimStatus, default: ClaimStatus.Unverified })
  status: ClaimStatus;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Event, (e) => e.claims, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ManyToOne(() => User, (u) => u.claims, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => Evidence, (ev) => ev.claim)
  evidence: Evidence[];

  @OneToMany(() => FactCheck, (fc) => fc.claim)
  factChecks: FactCheck[];

  @OneToMany(() => Prediction, (p) => p.claim)
  predictions: Prediction[];
}
