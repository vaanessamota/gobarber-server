import 'reflect-metadata';
import express, { Request, Response, NextFunction} from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';
import '@shared/container';


const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));
//middleware p/ servir arquivos de dentro de um diretorio

app.use(routes);

app.use((
    err: Error,
    request: Request,
    response: Response,
    _: NextFunction)=>{
        if(err instanceof AppError) {
            //se é um erro originado atraves da aplicação
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            })
        }

        console.error(err);

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        })
});
//middleware p/ tratativa de erros

app.listen(3333, () => {
  console.log('server started on port 3333!');
});

/**
 * rodar ➜ yarn tsc para converter o codigo em javascript
rodar  ➜ node dist/server.js para rodar o servidor
 * instalar ts-node-dev
 * ➜ yarn add ts-node-dev -D
 * adicionar em package.json (--transpileOnly apenas transpila o codigo sem dar alertas
 * --ignore-watch faz com que ignore a pasta node_modules deixando a transpilação mais rapida)
 * "scripts": {
    "build": "tsc",
    "dev:server": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"
  },
  para executar o servidor:
  ➜ yarn dev:server
 */
