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

  @Column({ type: 'varchar', nullable: true })
  username!: string | null;

  @Column({ type: 'varchar', nullable: true })
  fullName!: string | null;

  @Column({ type: 'varchar', unique: true, nullable: true })
  googleId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  picture!: string | null;

  @Column({ type: 'varchar', nullable: true })
  password!: string | null;

  // Estado de membresía interna de la app
  @Column({ type: 'boolean', default: false })
  membershipActive!: boolean;

  @Column({ type: 'varchar', nullable: true })
  membershipStatus!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  membershipStartedAt!: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  membershipEndsAt!: Date | null;

  // Datos del último pago de Mercado Pago
  @Column({ type: 'varchar', nullable: true })
  mercadoPagoLastPaymentId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoLastPreferenceId!: string | null;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoPayerEmail!: string | null;

  @Column({ type: 'varchar', nullable: true })
  mercadoPagoPaymentStatus!: string | null;

  @Column({ type: 'timestamp', nullable: true })
  mercadoPagoLastPaymentDate!: Date | null;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}