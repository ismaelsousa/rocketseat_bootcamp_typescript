import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

export default class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) throw new Error('Incorrect email/password combination');

    const passwordMatched = compare(password, user.password);

    if (!passwordMatched)
      throw new Error('Incorrect email/password combination');

    const token = sign({}, 'fb6718797233e9d9b5bebfaa09937dca', {
      subject: user.id,
      expiresIn: '1d',
    });
    delete user.password;
    return { user, token };
  }
}
