import { inject, injectable } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

@injectable()
class AllAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<Appointment[] | []> {
    const appointments = await this.appointmentsRepository.all();
    return appointments;
  }
}

export default AllAppointmentsService;
