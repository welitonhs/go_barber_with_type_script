import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AllAppointmentsService from '@modules/appointments/services/AllAppointmentsService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const allAppointments = container.resolve(AllAppointmentsService);
    const appointments = await allAppointments.execute();
    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { providerId, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      date: parsedDate,
      providerId,
    });
    return response.json(appointment);
  }
}
