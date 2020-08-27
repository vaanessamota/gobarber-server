import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers/'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
    'AppointmentsRepository',
    AppointmentsRepository);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository,
)
// recebe dois parametros: string com o nome da dependencia a ser injetada
// e a dependencia a ser injetada

// Diferença entre usar register e registerSingleton:
// register vai usar sempre uma nova instancia da classe quando um arquivo precisar
// do repository
// o registerSingleton utiliza somente uma instancia usada durante todo o ciclo de
// vida da aplicação, os proximos services vao sempre utilizar a msm instancia.
