import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentRepository';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
// import UsersRepository from '@modules/users/infra/typeorm/repositories/';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
