import 'reflect-metadata';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import IAppointmentRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You cant create an appointment on a past date.');
    }

    if (user_id === provider_id) {
      throw new AppError('You cant create an appointment with youself');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError('You can only create appointment between 8am and 5pm');

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate)
      throw new AppError('this appointment is already booked');

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      user_id,
    });

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia  ${format(
        appointmentDate,
        "dd/MM/yyyy 'às' HH:mm'h'",
      )}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointmentes:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d',
      )}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;
