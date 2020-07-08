import { getRepository } from 'typeorm';
import User from '../models/User';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {

    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });
        //verificar se o usuário existe atraves do email
        if (!user){
            //se nao existe retorna erro
            throw new AppError('Incorrect email/password combination.', 401);

        }

        //user.password - Senha criptografada
        //password - Senha não-criptografada

        const passwordMatched = await compare(password, user.password);

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
