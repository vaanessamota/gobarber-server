// create, show(mostrar um unico), update, index(mostrar uma listagem), delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';


export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response>{
        const UpdateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await UpdateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    }
}
