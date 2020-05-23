import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);

    /**
     * O container resolver verificar se precisa injetar uma dependencia,
     * se sim,
     * ele buscar no container que criei procurando a dependencia
     */

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parseDate,
      user_id,
    });
    return response.json(appointment);
  }
}
