/**
 * src/repositories/AppointmentsRepository.ts
 *
 * armazenamos os agendamentos nesse arquivo e qualquer função que irá mexer
 * no dados da aplicação é feita neste repository
 *
 * remove-se as responsabilidades do arquivo appointments.routes.ts
*/


import Appointment from '../models/Appointment';
import { EntityRepository, Repository } from 'typeorm';


@EntityRepository(Appointment) //passar model como parametro
class AppointmentsRepository extends Repository<Appointment> {
   //alem de estender a classe Repository é necessário dizer qual o model
   // do Repository por isso Repository<Appointment>

   public async findByDate(date: Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
        where: { date },
    })

    return findAppointment || null;
   }


}

export default AppointmentsRepository;
