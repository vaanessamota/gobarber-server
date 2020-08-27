import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

import CreateUserService from './CreateUserService';

describe('CreateUser', ()=> {
    it('should be able to create a new user',  async ()=>{
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        const user = await createUser.execute({
            name: 'Vanessa',
            email: 'vanessa@email.com',
            password: '123456'
        });

        expect(user).toHaveProperty('id');
        expect(user.email).toBe('vanessa@email.com');
    });

    it('should not be able to create user if email already exists',
    async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const user = await createUser.execute({
            name: 'Vanessa',
            email: 'vanessa@email.com',
            password: '123456'
        });

        expect(createUser.execute({
            name: 'Vanessa',
            email: 'vanessa@email.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError);
    });
});
