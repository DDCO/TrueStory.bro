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

export enum EvidenceType {
  Document = 'document',
  Video = 'video',
  Link = 'link',
  Statement = 'statement',
  Photo = 'photo',
}

@Entity('evidence')
export class Evidence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  claimId: string;

  @Column()
  addedById: string;

  @Column({ type: 'enum', enum: EvidenceType })
  type: EvidenceType;

  /** URL, file path, or text content */
  @Column({ type: 'text' })
  urlOrContent: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Claim, (c) => c.evidence, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'claimId' })
  claim: Claim;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'addedById' })
  addedBy: User;
}
