import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas } from '../utils';

const salvarReembolso = [
  campoObrigatorio(['numeroCartao'], (_, { path: campo }) => Respostas.campoObrigatorioGenerico(1, 'Número do cartão')),
  campoObrigatorio(['canalEntrada'], (_, { path: campo }) => Respostas.campoObrigatorioGenerico(2, 'Canal de entrada')),
  campoObrigatorio(['sequencialProcedimento'], (_, { path: campo }) =>
    Respostas.campoObrigatorioGenerico(3, 'sequencia procedimento')
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

export { salvarReembolso };
