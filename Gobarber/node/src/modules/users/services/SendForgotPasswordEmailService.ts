import 'reflect-metadata';
// import User from '@modules/users/infra/typeorm/entities/User';
// import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}
@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) throw new AppError('User does not exist');

    this.mailProvider.sendMail(email, 'Pedido de recuperação de senha!');
  }
}
