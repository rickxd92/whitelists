import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { Respostas, Rotas, campoObrigatorio, numeroDoCampoCartao } from '../utils';

const validarDadosSegurado = [
	campoObrigatorio(['numeroCartao'], (_, { path: campo }) => Respostas.campoObrigatorioGenerico(1, 'Número do cartão')),
  numeroDoCampoCartao('numeroCartao', Respostas.numeroCartaoBeneficiario(2)),
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

export { validarDadosSegurado };
