import { Router } from 'express';

import { getCustomRepository } from 'typeorm';

import { parseISO } from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (_, res) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parseDate = parseISO(date);
    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
    });
    return res.json(appointment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
export default appointmentsRouter;