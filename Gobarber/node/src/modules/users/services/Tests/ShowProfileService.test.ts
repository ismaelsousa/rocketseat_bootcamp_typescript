import ShowProfileService from '@modules/users/services/ShowProfileService';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John doe',
      email: 'john@emaple.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });

    expect(profile.email).toBe('john@emaple.com');
  });

  it('should not be able to show the profile non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
