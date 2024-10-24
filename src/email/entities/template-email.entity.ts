import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class EmailTemplate {
  @PrimaryColumn()
  id: string;
  @Column()
  subject: string;
  @Column('text')
  content: string;
  @Column('jsonb', { nullable: true })
  metadata?: Record<string, any>;
}
