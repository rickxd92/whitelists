import { NextFunction, Request, Response } from 'express';
import xml2js, { processors } from 'xml2js';
import { gravarLog } from '../../libs';
import { Erros, Respostas } from '../consts';

function criarbd() {
  const sqlite3 = require('sqlite3').verbose();

  // Cria ou abre o banco de dados "database.sqlite"
  const db = new sqlite3.Database('database.sqlite');

  // Executa uma consulta para criar a tabela "usuarios"
  db.run(`
CREATE TABLE IF NOT EXISTS whitelistAlphabot (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(40) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);
`);

  // Fecha a conexão com o banco de dados
  db.close();
}

function inserirDadosBd() {
  const sqlite3 = require('sqlite3').verbose();

  // Abre o banco de dados "database.sqlite"
  const db = new sqlite3.Database('database.sqlite');

  // Insere um novo usuário na tabela "usuarios"
  db.run(`
INSERT INTO whitelistAlphabot (nome, email, senha)
VALUES ('João Silva', 'joaosilva@email.com', '123456')
`);

  // Fecha a conexão com o banco de dados
  db.close();
}

function lerDadosBd() {
  const sqlite3 = require('sqlite3').verbose();

  // Abre o banco de dados "database.sqlite"
  const db = new sqlite3.Database('database.sqlite');

  // Seleciona todos os usuários da tabela "usuarios"
  db.all('SELECT * FROM whitelistAlphabot', (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }

    // Exibe os dados dos usuários
    console.log(rows);

    // Fecha a conexão com o banco de dados
    db.close();
  });
}

function descaracterizarTexto(texto: string, simbolo: string, inicio: number = 0, final?: number) {
  const textoSubstituir = texto.substring(inicio, final);
  const mascara = textoSubstituir.replace(/\S/g, simbolo);
  const textoDescaracterizado = texto.replace(textoSubstituir, mascara);
  return textoDescaracterizado;
}

function configurarTimeout(req: Request, res: Response, next: NextFunction) {
  const rota = req.path.substring(1);

  //FIXME: Colocado fixo devido a apontamento do fortify
  const timeout = 120000;

  res.setTimeout(timeout, () => {
    const respostaBff = Respostas.sistemaIndisponivel(99);
    gravarLog(rota, req.body, respostaBff);
    res.status(respostaBff.status).json(respostaBff.corpo);
  });
  next();
}

function obterMensagemErro(rota: string, erroLegado: string, codigoMensagem?: string) {
  const errosArray = Erros[rota] ? Object.keys(Erros[rota]) : [];
  let mensagemErro = Respostas.sistemaIndisponivel(99);

  if (codigoMensagem === '100') {
    return Respostas.mensagemSucessoCodigo100(erroLegado);
  }

  if (erroLegado.includes('O arquivo anexado não pode ser maior que')) {
    mensagemErro = Respostas.excedeLimiteTamanho(7);
  }

  if (erroLegado.includes('Beneficiário não possui apólice vigente na data')) {
    mensagemErro = Respostas.semApolice(99, erroLegado);
  }
  errosArray.forEach(erro => {
    if (erroLegado.includes(erro)) {
      mensagemErro = Erros[rota][erro];
    }
  });
  return mensagemErro;
}

function obterAmbiente() {
  let ambiente = '';
  if (process.env.NODE_ENV !== 'PRD') {
    ambiente = `${process.env.NODE_ENV?.toLowerCase().trim()}`;
  }
  return ambiente;
}

function primeirasMaiusculas(dado: string) {
  let palavrasSeparadas = dado.toLowerCase().split(' ');
  for (var i = 0; i < palavrasSeparadas.length; i++) {
    palavrasSeparadas[i] = palavrasSeparadas[i].charAt(0).toUpperCase() + palavrasSeparadas[i].substring(1);
  }
  return palavrasSeparadas.join(' ');
}

function converterXmlParaJson(xml: string) {
  const parser = new xml2js.Parser({
    ignoreAttrs: true,
    explicitArray: false,
    explicitRoot: false,
    tagNameProcessors: [processors.stripPrefix]
  });
  return parser.parseStringPromise(xml);
}

function tratarNumeroCartao(cartaoSegurado: any) {
  const numeroCartaoLength = 15;
  let numeroCartao = cartaoSegurado.toString();

  if (numeroCartao.length < numeroCartaoLength) {
    while (numeroCartao.length < numeroCartaoLength) {
      numeroCartao = '0' + numeroCartao;
    }
  }

  cartaoSegurado = numeroCartao;
  return cartaoSegurado;
}

function trataErro(error): { status: any; data: any } {
  if (error?.response?.status && error?.response?.data) {
    return { data: error.response.data, status: error.response.status };
  } else if (error.status === 200 || error.status === 400) {
    return { status: error.status, data: error.data };
  } else {
    return {
      status: 500,
      data: {
        mensagens: [
          {
            codigoMensagem: '500',
            descricaoMensagem: 'Desculpe, estamos com problemas técnicos. Tente novamente daqui alguns minutos.'
          }
        ],
        numeroProtocoloReembolso: '',
        taskId: ''
      }
    };
  }
}

export {
  configurarTimeout,
  converterXmlParaJson,
  criarbd,
  descaracterizarTexto,
  inserirDadosBd,
  lerDadosBd,
  obterAmbiente,
  obterMensagemErro,
  primeirasMaiusculas,
  trataErro,
  tratarNumeroCartao
};
