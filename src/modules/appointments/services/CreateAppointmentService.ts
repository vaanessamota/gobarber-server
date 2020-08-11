//src/services/CreateAppointmentService.ts

import Appointment from '../infra/typeorm/entities/Appointment';
import { startOfHour } from 'date-fns';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

/**
 * [ X ] Recebimento das informações
 * [ X ] Tratative de erros e exceções
 * [ ] Acesso ao Repositório
 *
 * service nao tem acesso direto aos dados da requisição e da resposta
 * (request e response)
 */

 /**
  * Dependency Inversion (SOLID)
  * receber objeto appointment no construtor para todas os services
  * trabalharem em cima do mesmo objeto
  */

interface IRequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {

    }

    //executar a criação de um novo appointment
    public async execute({date, provider_id}: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
