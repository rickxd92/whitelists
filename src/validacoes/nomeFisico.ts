import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas } from '../utils';

const nomefisico = [
  campoObrigatorio(['nomefisico'], (_, { path: campo }) => Respostas.campoObrigatorioGenerico(1, 'Nome Fisico')),
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

export { nomefisico };
