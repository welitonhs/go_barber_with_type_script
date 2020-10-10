import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customerId',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      providerId: 'user',
      userId: 'customerId',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailabilityService.execute({
      providerId: 'user',
      day: 20,
      month: 5,
      year: 2020,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 8,
          available: false,
        },
        {
          hour: 9,
          available: false,
        },
        {
          hour: 10,
          available: false,
        },
        {
          hour: 11,
          available: false,
        },
        {
          hour: 12,
          available: true,
        },
        {
          hour: 13,
          available: true,
        },
        {
          hour: 14,
          available: true,
        },
        {
          hour: 15,
          available: false,
        },
        {
          hour: 17,
          available: false,
        },
      ]),
    );
  });
});
