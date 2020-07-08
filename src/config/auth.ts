import { secretKeyJWT } from './env';

export default {
    jwt: {
        secret: secretKeyJWT,
        expiresIn: '1d',
    }
}
