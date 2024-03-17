import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas } from '../utils';

const numeroSinistro = [
  campoObrigatorio(['numeroSinistro'], (_, { path: campo }) => Respostas.campoObrigatorio(2, campo)),
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.listaDocumentosSinistro, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { numeroSinistro };
