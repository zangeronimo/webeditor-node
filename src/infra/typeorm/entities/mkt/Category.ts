import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Company from '../webeditor/Company';
import Product from './Product';

@Entity('mkt_categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  active?: 0|1;

  @Column({ name: 'webeditor_companies_id' })
  @Exclude()
  companyId: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'webeditor_companies_id' })
  company: Company;

  @OneToMany(() => Product, (product: Product) => product.category)
  products: Product[];

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

export default Category;
