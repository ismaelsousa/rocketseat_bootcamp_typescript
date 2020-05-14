import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '15151515151515151551515151515',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const date = new Date();
    const appointment = await createAppointmentService.execute({
      date,
      provider_id: '15151515151515151551515151515',
    });

    expect(
      createAppointmentService.execute({
        date,
        provider_id: '15151515151515151551515151515',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
