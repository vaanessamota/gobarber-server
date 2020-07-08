//src/models/User.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


// decorator funciona como se fosse uma função
// vai pegar a função Entity e enviar a classe Appointment como parametro
@Entity('users')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() //por padrao o time é varchar
    name: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}

export default User;
