const winston = require('winston');
/*require('winston-daily-rotate-file');

let transport = {};
const winstonOptions = {
  filename: '/var/log/teste/teste.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: false,
  maxSize: '10m',
  maxFiles: '7d'
};

try {
  transport = new winston.transports.DailyRotateFile(winstonOptions);
} catch {
  winstonOptions.filename = String(winstonOptions.filename).replace(/\//, '');
  transport = new winston.transports.DailyRotateFile(winstonOptions);
}

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [transport]
});
*/

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'teste' },
  transports: [
    new winston.transports.File({
      filename: './teste.log'
    })
  ]
});

function gravarLog(rota: string, requisicao: {}, respostaBFF: { status: number; corpo: {} }, respostaLegado?: {}) {
  const { status, corpo } = respostaBFF;
  let log = {
    data: new Date().toLocaleString(),
    rota: rota,
    statusBFF: status,
    requisicao: formatarDados(requisicao),
    respostaBFF: formatarDados(corpo),
    repostaLegado: respostaLegado ? formatarDados(respostaLegado) : 'sem resposta do legado ou timeout'
  };

  if (status <= 299) {
    return;
  } else {
    logger.error(log);
  }
}

function formatarDados(dados: {}) {
  if (dados) {
    const chavesArray = Object.keys(dados);
    chavesArray.forEach((chave, index) => {
      if (chave === 'cpf') {
        dados[chave] = '';
      } else if (chave === 'senha') {
        dados[chave] = '';
      } else if (chave === 'conteudo') {
        dados[chave] = '';
      } else if (chave === 'listaDocumentos') {
        if (dados[chave] && dados[chave] instanceof Array) {
          dados[chave] = tratarListaDocumentosAnexo(dados[chave]);
        }
      }
    });
  }
  return dados;
}

function tratarListaDocumentosAnexo(listaDocumentos) {
  listaDocumentos.forEach((documento, index) => {
    if (documento.listaAnexo && documento.listaAnexo instanceof Array) {
      listaDocumentos[index].listaAnexo.forEach((anexo, indexListaAnexo) => {
        if (anexo.conteudo) {
          listaDocumentos[index].listaAnexo[indexListaAnexo].conteudo = '';
        }
      });
    }
  });

  return listaDocumentos;
}

export { gravarLog };
