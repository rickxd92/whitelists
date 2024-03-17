import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { gravarLog } from '../libs';
import {
  arquivoJpgValido,
  arquivoPdfValido,
  arquivoPngValido,
  campoObrigatorio,
  formatoConteudoValido,
  Respostas,
  Rotas
} from '../utils';

// TODO: foi removida a validação de tamanho de imagem, voltar a validaçao assim que o negocio definir o tamanho
const anexoDocumento = [
  campoObrigatorio(['numeroCartao'], Respostas.numeroCartaoObrig(1)),
  campoObrigatorio(['conteudo'], Respostas.campoObrigatorioConteudo(5)),
  campoObrigatorio(['nomeArquivo'], Respostas.campoObrigatorioNome(6)),
  formatoConteudoValido('conteudo', Respostas.formatoArquivoInvalido(8)),
  arquivoPdfValido('conteudo', Respostas.arquivoPdfInvalido(9)),
  arquivoJpgValido('conteudo', Respostas.arquivoJpgInvalido(10)),
  arquivoPngValido('conteudo', Respostas.arquivoJpgInvalido(10)),
  /* excedeTamanho('conteudo', Respostas.excedeLimiteTamanho(7)), */
  (req: Request, res: Response, next: NextFunction) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      const respostaBff = erros.array()[0].msg;
      gravarLog(Rotas.incluirAnexoDocumento, req.body, respostaBff);
      return res.status(respostaBff.status).json(respostaBff.corpo);
    }
    next();
  }
];

export { anexoDocumento };
