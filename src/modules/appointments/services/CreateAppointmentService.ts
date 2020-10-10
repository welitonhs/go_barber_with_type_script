import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
  providerId: string;
  userId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    providerId,
    userId,
    date,
  }: IRequest): Promise<Appointment> {
    if (userId === providerId) {
      throw new AppError(
        "It's not possible to create an appointment with yourself.",
      );
    }
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked.');
    }
    const appointment = await this.appointmentsRepository.create({
      providerId,
      userId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
