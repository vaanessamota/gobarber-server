import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        ) {

    }

    public async execute({ user_id, avatarFilename }: IRequest):Promise<User>{
        const user = await this.usersRepository.findById(user_id);

        if(!user){
            throw new AppError(
                'Only authenticated users can change avatar.', 401);
        }

        if (user.avatar){
            //deletar avatar anterior, se usuario ja tiver avatar

            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar);

            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath
                );
            //a função stat traz o status do arquivo existir.

            if (userAvatarFileExists) {
                //se o arquivo existir deletar arquivo
                    await fs.promises.unlink(userAvatarFilePath);
                }

        }

        user.avatar = avatarFilename;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
