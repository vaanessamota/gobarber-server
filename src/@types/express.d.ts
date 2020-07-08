//anexando um type ao Express
declare namespace Express {
    export interface Request {
        user: {
            id: string;
        };
    }
}
