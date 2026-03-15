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

@Entity('predictions')
export class Prediction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  claimId: string;

  @Column()
  userId: string;

  /** User's predicted probability that the claim will turn out true (0–100). */
  @Column({ type: 'int' })
  probability: number;

  @CreateDateColumn()
  createdAt: Date;

  /** Set when claim is resolved; used to update reputation. */
  @Column({ type: 'boolean', nullable: true })
  resolvedCorrect: boolean | null;

  @ManyToOne(() => Claim, (c) => c.predictions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'claimId' })
  claim: Claim;

  @ManyToOne(() => User, (u) => u.predictions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
