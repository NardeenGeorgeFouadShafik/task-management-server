import { Task } from '../task/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, classToPlain } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { UserRole } from './enums/user_role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  user_name: string;

  @Exclude()
  @Column()
  password: string;

  @Column({default: 1})
  @IsEnum(UserRole)
  user_Role: UserRole;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
