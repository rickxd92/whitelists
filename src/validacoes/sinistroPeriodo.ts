import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, cpf, Respostas, Rotas, dataInicialValida, dataFinalValida } from '../utils';

const sinistroPeriodo = [
  campoObrigatorio(['numeroCartao', 'cpfTitular', 'dataFim', 'dataInicio'], (_, { path: campo }) =>
    Respostas.campoObrigatorio(8, campo)
  ),
  dataInicialValida('dataInicio', Respostas.dataInicialInvalida(10)),
  dataFinalValida('dataFim', Respostas.dataInvalida(2)),
  cpf('cpfTitular', Respostas.cpfInvalido(4)),
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.listaSinistroPeriodo, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { sinistroPeriodo };
