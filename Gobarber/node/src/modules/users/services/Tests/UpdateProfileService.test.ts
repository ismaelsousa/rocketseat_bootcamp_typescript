import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh tres',
      email: 'john3@emaple.com',
    });

    expect(updatedUser.email).toBe('john3@emaple.com');
  });

  it('should not be able to update the profile non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'user.id',
        name: 'test',
        email: 'test@emaple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'another',
      email: 'another@example.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John doe',
        email: 'another@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jonh tres',
      email: 'john3@emaple.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old one', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonh tres',
        email: 'john3@emaple.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jonh tres',
        email: 'john3@emaple.com',
        password: '123123',
        old_password: 'aaa',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
