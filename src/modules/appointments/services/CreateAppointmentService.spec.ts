import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', ()=> {
    it('should be able to create a new appointment',  async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentsRepository;
        const CreateAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
        );

        const appointment = await CreateAppointment.execute({
            date: new Date(),
            provider_id: '12432434',
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('12432434');
    });

    // it('should not be able to create a two appointments at the same time', ()=>{
    //     expect()
    // });
});
