import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import { campoObrigatorio, Respostas, Rotas, validaValorDigitoConta, validaValorNumerico } from '../utils';

const dadosBancarios = [
  campoObrigatorio(['numeroCartao'], Respostas.validaDadosBancarios(1, 'o cartão do beneficiário')),
  campoObrigatorio(['cpfNum', 'cpfDv'], Respostas.validaDadosBancarios(3, 'o CPF completo com digito verificador')),
  campoObrigatorio(['banco'], Respostas.validaDadosBancarios(4, 'o Banco')),
  campoObrigatorio(['agencia'], Respostas.validaDadosBancarios(5, 'a Agência')),
  campoObrigatorio(['conta'], Respostas.validaDadosBancarios(6, 'a Conta Corrente')),
  campoObrigatorio(['digitoConta'], Respostas.validaDadosBancarios(7, 'o dv da Conta Corrente')),
  campoObrigatorio(['tipoConta'], Respostas.validaDadosBancarios(8, 'o Tipo de Conta Corrente')),
  validaValorNumerico(
    ['cpfNum', 'cpfDv', 'banco', 'agencia', 'conta', 'tipoConta'],
    Respostas.validaDadosBancariosValorNumerico(9)
  ),
  validaValorDigitoConta('digitoConta', Respostas.validaDadosBancariosValorDigitoConta(10)),
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

export { dadosBancarios };
