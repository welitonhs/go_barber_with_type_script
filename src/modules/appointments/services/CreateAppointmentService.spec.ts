import AppError from '@shared/errors/AppError';

import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeUsersRepository: FakeUsersRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      userId: '123456',
      providerId: '123123',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.providerId).toBe('123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointmentDateNow = new Date(2020, 4, 15, 11);
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

  it('should not be able the user create appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        userId: '123123',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before at 8 am or after 5 pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 7).getTime();
    });
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        userId: '123123',
        providerId: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        userId: '123123',
        providerId: '123456',
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
