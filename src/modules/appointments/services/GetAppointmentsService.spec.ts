import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import GetAppointmentsService from './GetAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('GetAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('should be return all appointments created', async () => {
    await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      providerId: '123123',
      userId: 'customerId',
    });
    await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 15),
      providerId: '112233',
      userId: 'customerId',
    });
    const allAppointments = new GetAppointmentsService(
      fakeAppointmentsRepository,
    );
    const appointments = await allAppointments.execute();
    expect(appointments.length).toBe(2);
  });

  // it('should no be able to create two appointment on the same time', () => {});
});
