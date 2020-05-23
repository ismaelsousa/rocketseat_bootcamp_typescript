import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    /**
     * O container resolver verificar se precisa injetar uma dependencia,
     * se sim,
     * ele buscar no container que criei procurando a dependencia
     */

    const listProviderDayAvailabilityService = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const availability = await listProviderDayAvailabilityService.execute({
      day,
      month,
      provider_id,
      year,
    });
    return response.json(availability);
  }
}
