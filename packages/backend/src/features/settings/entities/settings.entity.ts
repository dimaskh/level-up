import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ThemeType } from '../dto/settings.dto';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column({
    type: 'enum',
    enum: ThemeType,
    default: ThemeType.SYSTEM,
  })
  theme: ThemeType;

  @Column('jsonb')
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };

  @Column('jsonb')
  display: {
    density: string;
    fontSize: string;
  };

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
