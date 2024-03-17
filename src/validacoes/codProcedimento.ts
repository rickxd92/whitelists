import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas } from '../utils';

const codProcedimento = [
  campoObrigatorio(['codProcedimento'], (_, { path: campo }) => Respostas.campoObrigatorioGenerico(1, 'procedimento')),
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.calculoReembolsoRequerAnalise, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { codProcedimento };
