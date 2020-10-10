import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 3, 10, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customer',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 19).getTime();
    });

    const availability = await listProviderMonthAvailabilityService.execute({
      providerId: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 18,
          available: false,
        },
        {
          day: 19,
          available: true,
        },
        {
          day: 20,
          available: false,
        },
        {
          day: 21,
          available: true,
        },
        {
          day: 22,
          available: true,
        },
      ]),
    );
  });
});
