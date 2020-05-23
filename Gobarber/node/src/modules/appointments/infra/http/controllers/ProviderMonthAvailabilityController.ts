import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    /**
     * O container resolver verificar se precisa injetar uma dependencia,
     * se sim,
     * ele buscar no container que criei procurando a dependencia
     */

    const listProviderMonthAvailabilityService = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const availability = await listProviderMonthAvailabilityService.execute({
      month,
      provider_id,
      year,
    });
    return response.json(availability);
  }
}
