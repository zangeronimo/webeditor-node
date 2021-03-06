import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  AfterLoad,
} from 'typeorm';
import Company from './Company';
import Role from './Role';

@Entity('webeditor_modules')
class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Company, (company: Company) => company.modules)
  @JoinTable({ name: 'webeditor_companies_has_webeditor_modules', joinColumn: { name: 'webeditor_modules_id' }, inverseJoinColumn: { name: 'webeditor_companies_id' } })
  companies: Company[];

  @AfterLoad()
  sortItems() {
    if (this?.roles?.length) {
      this.roles.sort((a, b) => a.order - b.order);
    }
  }
  @OneToMany(() => Role, (role: Role) => role.module)
  roles: Role[];

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

export default Module;
