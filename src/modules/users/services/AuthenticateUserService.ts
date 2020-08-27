import User from '@modules/users/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        ) {

    }

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email);
        //verificar se o usuário existe atraves do email
        if (!user){
            //se nao existe retorna erro
            throw new AppError('Incorrect email/password combination.', 401);

        }

        //user.password - Senha criptografada
        //password - Senha não-criptografada

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if(!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({ }, secret, {
            subject: user.id, //id do usuario que gerou o token
            expiresIn: expiresIn,
        })
        //nao colocar credenciais ou infos mais seguras (email ou senha)
        //primeiro parametro é o payload
        //segundo parametro é a chave secreta
        //terceiro parametro sao as configurações do token

        return {
            user,
            token
        }
   }
}

export default AuthenticateUserService;
