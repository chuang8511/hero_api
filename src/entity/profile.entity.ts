import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Index()
    @Column()
    hero_id: number;
    
    @Column()
    str: number;

    @Column()
    int: number;

    @Column()
    agi: number;

    @Column()
    luk: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}