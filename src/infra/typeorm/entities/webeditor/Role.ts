import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Module from './Module';
import User from './User';

@Entity('webeditor_roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  label: string;

  @Column({ name: 'webeditor_modules_id' })
  @Exclude()
  moduleId: string;

  @ManyToOne(() => Module)
  @JoinColumn({ name: 'webeditor_modules_id' })
  module: Module;

  @ManyToMany(() => User, (user: User) => user.roles)
  @JoinTable({ name: 'webeditor_users_has_webeditor_roles', joinColumn: { name: 'webeditor_users_id' }, inverseJoinColumn: { name: 'webeditor_roles_id' } })
  users: User[];

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt: Date;
}

export default Role;
