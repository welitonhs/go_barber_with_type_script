import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

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
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'Updated John Doe',
      email: 'updatedjohndoe@example.com',
    });

    expect(updatedUser.name).toBe('Updated John Doe');
    expect(updatedUser.email).toBe('updatedjohndoe@example.com');
  });

  it('should not be able to change profile with e-mail already use for another user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await fakeUsersRepository.create({
      name: 'Another John',
      email: 'anotherjohn@example.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Updated John Doe',
        email: 'anotherjohn@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      userId: user.id,
      name: 'Updated John Doe',
      email: 'updatedjohndoe@example.com',
      oldPassword: '123456',
      password: '12341234',
    });

    expect(updatedUser.password).toBe('12341234');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Updated John Doe',
        email: 'updatedjohndoe@example.com',
        password: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        userId: user.id,
        name: 'Updated John Doe',
        email: 'updatedjohndoe@example.com',
        oldPassword: 'wrong-password',
        password: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password when user not exists', async () => {
    await expect(
      updateProfileService.execute({
        userId: 'non-existing-user',
        name: 'Updated John Doe',
        email: 'updatedjohndoe@example.com',
        password: '12341234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
