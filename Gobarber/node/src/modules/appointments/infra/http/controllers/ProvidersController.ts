import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    /**
     * O container resolver verificar se precisa injetar uma dependencia,
     * se sim,
     * ele buscar no container que criei procurando a dependencia
     */

    const listProviders = container.resolve(ListProvidersService);

    const providers = await listProviders.execute({
      user_id,
    });
    return response.json(providers);
  }
}
