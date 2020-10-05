import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const showProfile = container.resolve(ShowProfileService);
    const user = await showProfile.execute(userId);
    delete user.password;
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { name, email, oldPassword, password } = request.body;
    const updateProfile = container.resolve(UpdateProfileService);
    const updatedUser = await updateProfile.execute({
      userId,
      name,
      email,
      oldPassword,
      password,
    });
    delete updatedUser.password;
    return response.json(updatedUser);
  }
}
