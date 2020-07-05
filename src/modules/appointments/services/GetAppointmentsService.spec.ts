import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import GetAppointmentsService from './GetAppointmentsService';

describe('GetAppointments', () => {
  it('should be return all appointments created', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    await createAppointment.execute({
      date: new Date(2020, 4, 10, 11),
      providerId: '123123',
    });
    await createAppointment.execute({
      date: new Date(2020, 4, 10, 15),
      providerId: '112233',
    });
    const allAppointments = new GetAppointmentsService(
      fakeAppointmentsRepository,
    );
    const appointments = await allAppointments.execute();
    expect(appointments.length).toBe(2);
  });

  // it('should no be able to create two appointment on the same time', () => {});
});
