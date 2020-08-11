//src/models/Appointment.ts
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

/**
 * Relacionamentos:
 *
 * Um para Um (OneToOne)
 * Um para Muitos (OneToMany)
 * Muitos para Muitos (ManyToMany)
 */


// decorator funciona como se fosse uma função
// vai pegar a função Entity e enviar a classe Appointment como parametro
@Entity('appointments')
class Appointment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() //por padrao o time é varchar
    provider_id: string;

    @ManyToOne( ()=> User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}

export default Appointment;
