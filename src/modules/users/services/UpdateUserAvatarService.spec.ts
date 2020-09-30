import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to add a new avatar on exists user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'avatartest.jpg',
    });
    expect(user.avatar).toBe('avatartest.jpg');
  });

  it('should not be able to add a new avatar in not exists a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    await expect(
      updateUserAvatar.execute({
        userId: 'wrong_id',
        avatarFilename: 'avatartest.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete a exists avatar when the user altered the avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'firstAvatarTest.jpg',
    });
    await updateUserAvatar.execute({
      userId: user.id,
      avatarFilename: 'secondAvatarTest.jpg',
    });
    expect(deleteFile).toHaveBeenCalledWith('firstAvatarTest.jpg');
    expect(user.avatar).toBe('secondAvatarTest.jpg');
  });
});
