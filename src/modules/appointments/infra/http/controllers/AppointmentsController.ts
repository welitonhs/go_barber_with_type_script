import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import GetAppointmentsService from '@modules/appointments/services/GetAppointmentsService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getAppointments = container.resolve(GetAppointmentsService);
    const appointments = await getAppointments.execute();
    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { providerId, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      date: parsedDate,
      userId,
      providerId,
    });
    return response.json(appointment);
  }
}
