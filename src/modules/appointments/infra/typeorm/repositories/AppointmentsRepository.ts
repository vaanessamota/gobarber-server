/**
 * src/repositories/AppointmentsRepository.ts
 *
 * armazenamos os agendamentos nesse arquivo e qualquer função que irá mexer
 * no dados da aplicação é feita neste repository
 *
 * remove-se as responsabilidades do arquivo appointments.routes.ts
*/

import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '../entities/Appointment';


class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }
   //alem de estender a classe Repository é necessário dizer qual o model
   // do Repository por isso Repository<Appointment>

   public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findAppointment = await this.ormRepository.findOne({
        where: { date },
    })

    return findAppointment;
   }

   public async create({provider_id, date}: ICreateAppointmentDTO):
    Promise<Appointment> {
       const appointment = this.ormRepository.create({ provider_id, date});

       await this.ormRepository.save(appointment);

       return appointment;
   }


}

export default AppointmentsRepository;
