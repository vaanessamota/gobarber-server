//src/services/CreateAppointmentService.ts

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

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

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    //executar a criação de um novo appointment
    public async execute({date, provider_id}: RequestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmentInSameDate){
            throw new AppError('This appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
