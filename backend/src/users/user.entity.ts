import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', unique: true })
  email!: string;

  @Column({ type: 'varchar', unique: true })
  username!: string;

  @Column({ type: 'varchar' })
  password!: string;

  @Column({ type: 'boolean', default: false })
  subscriptionActive!: boolean;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoPreapprovalId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoPlanId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  subscriptionStatus!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionStartedAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionEndsAt!: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}