import { Request, Response} from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { provider_id, date } = request.body;
        //provider é o prestador ou barbeiro que irá atender

        const parsedDate = parseISO(date)

        const createAppointment = container.resolve(CreateAppointmentService);
        // resolve: carrega o service, vê se precisa de dependencia, e retorna uma
        // instancia da classe

        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id});

        return response.json(appointment);
    }

}
