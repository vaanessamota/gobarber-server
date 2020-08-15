import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

//Responsabilidade da Rota: Receber Requisição, chamar outro arquivo, devolver
// resposta

const appointmentsRouter = Router();

/**
 * DTO - Data Transfer Object
 * Transferir objeto de dados ( de um arquivo pra outro )
 */
appointmentsRouter.use(ensureAuthenticated);
//aplica o middleware em todas as rotas

// appointmentsRouter.get('/', async (request, response)=>{
//     const appointments = await appointmentsRepository.find();

//     response.json(appointments);
// });


appointmentsRouter.post('/', async (request, response)=>{
    const appointmentsRepository = new AppointmentsRepository();

    const { provider_id, date } = request.body;
    //provider é o prestador ou barbeiro que irá atender

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
        appointmentsRepository
    );

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id});

    return response.json(appointment);
});

export default appointmentsRouter;
