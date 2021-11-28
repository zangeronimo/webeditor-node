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
import Category from './Category';
import Image from './Image';
import Rate from './Rate';

@Entity('recipes')
class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column()
  ingredients: string;

  @Column()
  preparation: string;

  @Column()
  active?: 0|1;

  @Column({ name: 'recipe_categories_id' })
  @Exclude()
  categoryId: string;

  @Column({ name: 'webeditor_companies_id' })
  @Exclude()
  companyId: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'recipe_categories_id' })
  category: Category;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'webeditor_companies_id' })
  company: Company;

  @OneToMany(() => Image, (image: Image) => image.recipe)
  images: Image[];

  @OneToMany(() => Rate, (rate: Rate) => rate.recipe)
  ratings: Rate[];

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

export default Recipe;
