import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Claim } from '../../claims/entities/claim.entity';
import { FactCheck } from '../../fact-checking/entities/fact-check.entity';
import { Prediction } from '../../predictions/entities/prediction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  displayName: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  googleId: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  facebookId: string | null;

  /** Reliability score: increases with confirmed reports, correct fact-checks; decreases with false claims. */
  @Column({ type: 'float', default: 0 })
  reputationScore: number;

  /** Verified reporters can publish events without community confirmation. */
  @Column({ type: 'boolean', default: false })
  verifiedReporter: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Claim, (c) => c.author)
  claims: Claim[];

  @OneToMany(() => FactCheck, (fc) => fc.user)
  factChecks: FactCheck[];

  @OneToMany(() => Prediction, (p) => p.user)
  predictions: Prediction[];
}
