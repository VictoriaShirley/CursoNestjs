import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'task'})
export class TaskEntity {

    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({type: 'varchar', nullable:true})
    title: string;

    @Column({type: 'varchar', nullable:true})
    description: string;

    @Column({type: 'varchar', nullable:true})
    status: string;

    @Column({type: 'timestamptz', name: 'expiration_date', nullable:true})
    expirationDate: Date;
}