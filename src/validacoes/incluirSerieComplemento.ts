import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas, validarCampoArray, ValidarDadosArray } from '../utils';

const incluirSerieComplemento = [
  campoObrigatorio(['numeroProtocolo', 'canalEntrada', 'listaDocumentos'], (_, { path: campo }) =>
    Respostas.campoObrigatorio(1, campo)
  ),
  validarCampoArray('listaDocumentos', Respostas.campoObrigatorio(1, 'listaDocumentos')),
  ValidarDadosArray('listaDocumentos', Respostas.camposObrigatorios(1, 'listaAnexo e seqTipoDocumento'), [
    'listaAnexo',
    'seqTipoDocumento'
  ]),
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

export { incluirSerieComplemento };
