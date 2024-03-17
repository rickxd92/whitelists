import { NextFunction, Request, Response } from 'express';
import { check, oneOf, validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { Respostas, Rotas, campoObrigatorio, dataFinalValida, dataInicialValida, validaDiferencaDatas } from '../utils';

const sequencialObterSinistros = [
  campoObrigatorio(['numeroCartao'], (_, { path: campo }) => Respostas.numeroCartaoObrig(1)),
  campoObrigatorio(['tipoProcesso'], (_, { path: campo }) => Respostas.processoObrigatorio(3)),
  oneOf(
    [check('numeroSinistro').notEmpty(), check('dataInicio').notEmpty(), check('dataFim').notEmpty()],{
      message: Respostas.erroGenericoMapeado(5, 'O período de datas ou o número do protocolo precisam ser informados!')
    }
  ),
  dataInicialValida('dataInicio', Respostas.erroGenericoMapeado(7, 'Data inválida!')),
  dataFinalValida('dataFim', Respostas.erroGenericoMapeado(7, 'Data inválida!')),
  validaDiferencaDatas(
    'dataInicio',
    Respostas.erroGenericoMapeado(8, 'Período de datas precisa ser inferior a 1 ano!')
  ),
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

export { sequencialObterSinistros };
