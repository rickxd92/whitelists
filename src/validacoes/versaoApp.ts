import { NextFunction, Request, Response } from 'express';
import { ValidationChain, check, validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { Respostas, Rotas, campoObrigatorio } from '../utils';

const MENSAGEM = 'Para utilizar o recurso de reembolso é necessário atualizar seu aplicativo.';
const RESPONSE_ERROR = Respostas.erroGenericoMapeado(10, MENSAGEM);
const VERSAO_MINIMA_APP = {
  bsc: [2, 22, 2],
  saude: [7, 5, 5],
  concierge: [7, 5, 5]
};

const VERSAO_DSV = {
  bsc: [1, 0],
  saude: [1, 0],
  concierge: [1, 0]
};

function validarVersaoApp(): ValidationChain {
  return check(['versaoApp'], RESPONSE_ERROR).custom(versaoApp => {
    const split = versaoApp.split(':');
    const app = split[0] as string;
    const versao = split[1] as string;

    if (VERSAO_MINIMA_APP[app]) {
      const splitVersao = versao.split('.').map(v => Number(v));
      const versaoProd = verificarVersaoProd(splitVersao, app);
      const versaoDsv = verificarVersaoDsv(splitVersao, app);

      return versaoProd || versaoDsv;
    }

    return false;
  });
}

function verificarVersaoDsv(splitVersao: number[], app: string) {
  return splitVersao[0] === VERSAO_DSV[app][0] && splitVersao[1] === VERSAO_DSV[app][1];
}

function verificarVersaoProd(splitVersao: number[], app: string) {
  return (
    splitVersao[0] * 1000 + splitVersao[1] * 100 + splitVersao[2] >=
    VERSAO_MINIMA_APP[app][0] * 1000 + VERSAO_MINIMA_APP[app][1] * 100 + VERSAO_MINIMA_APP[app][2]
  );
}

const versaoApp = [
  campoObrigatorio(['versaoApp'], RESPONSE_ERROR),
  validarVersaoApp(),
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

export { versaoApp };
