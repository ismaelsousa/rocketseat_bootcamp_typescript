import AppError from '@shared/errors/AppError';
import CreateAppointmentService from '../CreateAppointmentService';
import FakeAppointmentRepository from '../../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '15151515151515151551515151515',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const date = new Date();
    await createAppointmentService.execute({
      date,
      provider_id: '15151515151515151551515151515',
    });

    await expect(
      createAppointmentService.execute({
        date,
        provider_id: '15151515151515151551515151515',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
