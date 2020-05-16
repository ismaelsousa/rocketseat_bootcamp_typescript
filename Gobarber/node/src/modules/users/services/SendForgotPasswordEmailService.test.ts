import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/providers/MailProvider/Fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeMailProvider = new FakeMailProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@emaple.com',
    });

    expect(sendMail).toBeCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeMailProvider = new FakeMailProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
    );

    await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johns@emaple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
