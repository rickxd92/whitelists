import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { Respostas, Rotas, campoObrigatorio } from '../utils';

const sequencia = [
  campoObrigatorio(['procedimento'], (_, { path: campo }) => Respostas.campoObrigatorio(6, campo)),
  campoObrigatorio(['tipoProcesso'], (_, { path: campo }) => Respostas.campoObrigatorio(6, campo)),
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.validarProcedimentoReembolso, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { sequencia };
