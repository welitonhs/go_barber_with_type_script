import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProviderService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviderService = new ListProviderService(fakeUsersRepository);
  });
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });
    const logedUser = await fakeUsersRepository.create({
      name: 'John Loged',
      email: 'johnloged@example.com',
      password: '123456',
    });
    const providers = await listProviderService.execute({
      userId: logedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
