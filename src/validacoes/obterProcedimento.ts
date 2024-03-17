import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { Respostas, Rotas, campoObrigatorio } from '../utils';

const validarObterProcedimento = [
	campoObrigatorio(['sequencialTipoProcesso'], (_, { path: campo }) => Respostas.campoObrigatorio(1, campo)),
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

export { validarObterProcedimento };
