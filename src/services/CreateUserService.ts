import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';
import AppError from '../errors/AppError';


interface Request {
    name: string;
    email: string;
    password: string;
}

// se os metodos para lidar com dados de usuarios forem padroes nao é necessario
// criar um repositorio, utilizar apenas getRepository(User)

class CreateUserService {

    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email }
        })

        if (checkUserExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await hash(password, 8);
        //8 tamanho da string salt

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }


}

export default CreateUserService;
