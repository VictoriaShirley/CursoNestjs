import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'user'})
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', nullable:true})
    username: string;

    @Column({type: 'varchar', nullable:true})
    email: string;

    @Column({type: 'varchar', name: 'password_hash', nullable:true})
    passwordHash: string;
}