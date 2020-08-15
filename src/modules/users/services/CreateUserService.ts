import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

// se os metodos para lidar com dados de usuarios forem padroes nao é necessario
// criar um repositorio, utilizar apenas getRepository(User)

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {

    }

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);
        //8 tamanho da string salt

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }


}

export default CreateUserService;
