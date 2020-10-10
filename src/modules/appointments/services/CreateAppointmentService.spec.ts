import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      userId: '123456',
      providerId: '123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDateNow = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date: appointmentDateNow,
      userId: '123456',
      providerId: '123123',
    });
    await expect(
      createAppointment.execute({
        date: appointmentDateNow,
        userId: '123456',
        providerId: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able the user create an appointment with yourself', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(),
        userId: '123456',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
