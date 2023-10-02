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
import Company from './Company';
import Role from './Role';

@Entity('webeditor_users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ name: 'webeditor_companies_id' })
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'webeditor_companies_id' })
  company: Company;

  @ManyToMany(() => Role, (role: Role) => role.users)
  @JoinTable({ name: 'webeditor_users_has_webeditor_roles', joinColumn: { name: 'webeditor_users_id' }, inverseJoinColumn: { name: 'webeditor_roles_id' } })
  roles: Role[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default User;
