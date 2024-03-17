import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas, validaCelular, validaDDD, validaEmail } from '../utils';

const dadosNotificacao = [
  campoObrigatorio(['numeroCartao'], (_, { path: campo }) => Respostas.numeroCartaoObrig(1)),
  validaDDD('dddCelular', Respostas.campoObrigatorioDDD(4)),
  validaCelular('numeroCelular', Respostas.campoObrigatorioCelular(6)),
  validaEmail(['email'], (_, { path: campo }) => Respostas.campoObrigatorioEmail(5)),
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.dadosSegurado, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { dadosNotificacao };
