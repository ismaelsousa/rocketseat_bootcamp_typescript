import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/providers/MailProvider/Fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokenRepository from '@modules/users/repositories/fakes/FakeUserTokenRepository';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let fakeUserTokenRepository: FakeUserTokenRepository;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
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

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john@emaple.com',
    });

    expect(generateToken).toBeCalledWith(user.id);
  });
});
