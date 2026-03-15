import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Claim } from '../../claims/entities/claim.entity';
import { User } from '../../users/entities/user.entity';

export enum FactCheckType {
  Challenge = 'challenge',
  Confirm = 'confirm',
  CounterEvidence = 'counter_evidence',
  Context = 'context',
}

@Entity('fact_checks')
export class FactCheck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  claimId: string;

  @Column()
  userId: string;

  @Column({ type: 'enum', enum: FactCheckType })
  type: FactCheckType;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Claim, (c) => c.factChecks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'claimId' })
  claim: Claim;

  @ManyToOne(() => User, (u) => u.factChecks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
