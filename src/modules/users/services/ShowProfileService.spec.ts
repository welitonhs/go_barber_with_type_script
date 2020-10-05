import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUsersRepository);
  });
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const profile = await showProfileService.execute(user.id);
    expect(profile).toBeInstanceOf(User);
    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });
  it('should not be able to show the profile when the user not exists', async () => {
    await expect(
      showProfileService.execute('id_not_exists'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
