import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'created_by' })
  createdBy: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'varchar', length: 100, nullable: true, name: 'updated_by' })
  updatedBy: string;

  @UpdateDateColumn({ type: 'timestamp with time zone', nullable: true, name: 'updated_at' })
  updatedAt: Date;
}