import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Company from '../webeditor/Company';
import Recipe from './Recipe';

@Entity('recipe_ratings')
class Rate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rate: number;

  @Column()
  comment: string;

  @Column()
  active?: 0|1|2;

  @Column({ name: 'recipes_id' })
  @Exclude()
  recipeId: string;

  @Column({ name: 'webeditor_companies_id' })
  @Exclude()
  companyId: string;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipes_id' })
  recipe: Recipe;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'webeditor_companies_id' })
  company: Company;

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

export default Rate;
