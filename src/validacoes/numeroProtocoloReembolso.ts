import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas, numeroCampoProtocolo } from '../utils';

const numeroProtocoloReembolso = [
  campoObrigatorio(['numeroProtocoloReembolso'], (_, { path: campo }) =>
    Respostas.campoObrigatorioGenerico(1, 'Número do protocolo')
  ),
  numeroCampoProtocolo(
    'numeroProtocoloReembolso',
    Respostas.erroGenericoMapeado(2, 'O número do protocolo do  reembolso informado precisa ter 16 posições!')
  ),
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

export { numeroProtocoloReembolso };
