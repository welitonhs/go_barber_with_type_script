import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the appointments to provider on a specific day', async () => {
    const appointmentOne = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'customer',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointmentTwo = await fakeAppointmentsRepository.create({
      providerId: 'provider',
      userId: 'customer',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      providerId: 'provider',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointmentOne, appointmentTwo]);
  });
});
