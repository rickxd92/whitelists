import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas } from '../utils';

const tipoProcesso = [
  campoObrigatorio(['tipoProcesso'], (_, { path: campo }) =>
    Respostas.erroGenericoMapeado(1, 'É obrigatório informar o tipo de processo')
  ),
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.obterProcedimentosPorCategoria, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { tipoProcesso };
