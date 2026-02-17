import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  creatorId: string;

  @Column('uuid', { array: true, default: () => 'ARRAY[]::uuid[]' })
  liveIds: string[];

  @Column({ type: 'int', default: 0 })
  viewers: number;

  @CreateDateColumn()
  createdAt: Date;
}
