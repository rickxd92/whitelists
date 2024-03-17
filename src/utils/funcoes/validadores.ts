import { check } from 'express-validator';
import moment from 'moment';

let pegaDataInicial: string;
let pegaDataFinal: string;

function campoObrigatorio(campos: Array<string>, mensagem: {}) {
  return check(campos, mensagem).notEmpty();
}

function validarCampoArray(campo: string, mensagem: {}) {
  return check(campo, mensagem).custom(validarArray);
}

function ValidarDadosArray(campo: string, mensagem: {}, camposValidacao) {
  return check(campo, mensagem).custom(array => dadosArray(array, camposValidacao));
}

function dadosArray(array: Array<any>, camposValidacao: Array<string>) {
  let check = true;
  array.forEach(lista => {
    camposValidacao.forEach(campo => {
      if (!lista.hasOwnProperty(campo)) {
        check = false;
        return;
      }
    });
  });

  return check;
}

function validarArray(campo: Array<any>) {
  return check(campo).isArray();
}

function validaEmail(campos: Array<string>, mensagem: {}) {
  return check(campos, mensagem).matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function numeroDoCampoCartao(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).isLength({ min: 15 }).isNumeric({ no_symbols: true });
}

function validaDDD(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).isLength({ min: 2, max: 2 }).isNumeric({ no_symbols: true });
}

function validaValorNumerico(nomeCampo: Array<string>, mensagem: {}) {
  return check(nomeCampo, mensagem).isNumeric({ no_symbols: true });
}

function validaValorDigitoConta(valor: string, mensagem: {}) {
  return check(valor, mensagem).matches(/^[0-9X]$/);
}

function validaCelular(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).isLength({ min: 8, max: 9 }).isNumeric({ no_symbols: true });
}

function validadorDataInicial(data: string) {
  if (data) {
    const validaRegex = /(\d{4}-\d{2}-\d{2})|(\d{2}\/\d{2}\/\d{4})/.exec(data);

    if (validaRegex == null) {
      return false;
    }

    pegaDataInicial = data;
    const recebeData = new Date(moment(data, ['YYYY-MM-DD', 'DD/MM/YYYY']).toString());
    const hoje = new Date();
    return moment(hoje).isSameOrAfter(recebeData);
  } else {
    return true;
  }
}

function dataInicialValida(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorDataInicial);
}

function dataFinalValida(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorData);
}

function validadorData(data: string) {
  if (data) {
    const validaRegex = /(\d{4}-\d{2}-\d{2})|(\d{2}\/\d{2}\/\d{4})/.exec(data);

    if (validaRegex == null) {
      return false;
    }

    pegaDataFinal = data;
    const dataInicial = new Date(moment(pegaDataInicial, ['YYYY-MM-DD', 'DD/MM/YYYY']).toString());
    const dataFinal = new Date(moment(pegaDataFinal, ['YYYY-MM-DD', 'DD/MM/YYYY']).toString());
    return moment(dataFinal).isSameOrAfter(dataInicial);
  } else {
    return true;
  }
}

function cpf(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem)
    .isLength({ min: 11, max: 11 })
    .isNumeric({ no_symbols: true })
    .custom(validadorAlgoritimoCpf);
}

function validadorAlgoritimoCpf(cpf: string) {
  if (
    cpf === '00000000000' ||
    cpf === '11111111111' ||
    cpf === '22222222222' ||
    cpf === '33333333333' ||
    cpf === '44444444444' ||
    cpf === '55555555555' ||
    cpf === '66666666666' ||
    cpf === '77777777777' ||
    cpf === '88888888888' ||
    cpf === '99999999999'
  ) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let verificador = 11 - (soma % 11);
  if (verificador === 10 || verificador === 11) {
    verificador = 0;
  } else if (verificador !== parseInt(cpf.charAt(9))) {
    return false;
  }
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  verificador = 11 - (soma % 11);
  if (verificador === 10 || verificador === 11) {
    verificador = 0;
  } else if (verificador !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
}

function validaDiferencaDatas(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorDiferencaDatas);
}

function validadorDiferencaDatas(data: string) {
  if (data) {
    const dataInicial = new Date(moment(pegaDataInicial, ['YYYY-MM-DD', 'DD/MM/YYYY']).toString());
    const dataFinal = new Date(moment(pegaDataFinal, ['YYYY-MM-DD', 'DD/MM/YYYY']).toString());
    return moment(dataInicial).add(1, 'y').isSameOrAfter(dataFinal);
  } else {
    return true;
  }
}

function excedeTamanho(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorTamanho);
}

function validadorTamanho(campo: string) {
  const buffer = Buffer.from(campo.substring(campo.indexOf(',') + 1));
  const tamanhoKb = (4 * Math.ceil(Number(buffer.length) / 3)) / 1000;
  if (tamanhoKb > 1024) {
    return false;
  }
  return true;
}

function formatoConteudoValido(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorJpgPdfPng);
}

function validadorJpgPdfPng(campo: string) {
  if (campo.charAt(0) !== '/' && campo.charAt(0) !== 'J' && campo.charAt(0) !== 'i') {
    return false;
  }
  return true;
}

function arquivoPdfValido(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorArquivoPdf);
}

function validadorArquivoPdf(campo: string) {
  try {
    if (campo.charAt(0) !== 'J') {
      return true;
    }
    const base64hex = Buffer.from(campo, 'base64').toString('hex');
    const hexConvertido = Buffer.from(base64hex.substr(0, 16), 'hex').toString();
    if (!hexConvertido.match(/%PDF-1.[0-7]/g)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

function arquivoJpgValido(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorArquivoJpg);
}

function validadorArquivoJpg(campo: string) {
  try {
    if (campo.charAt(0) !== '/') {
      return true;
    }
    const base64hex = Buffer.from(campo, 'base64').toString('hex');
    if (!base64hex.match(/ffd8.*ffd9/g)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

function arquivoPngValido(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).custom(validadorArquivoPng);
}

function validadorArquivoPng(campo: string) {
  try {
    if (campo.charAt(0) !== 'i') {
      return true;
    }
    const base64hex = Buffer.from(campo, 'base64').toString('hex');
    if (!base64hex.match(/ffd8.*ffd9/g)) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

function numeroCampoProtocolo(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo, mensagem).isLength({ min: 16 }).isNumeric({ no_symbols: true });
}

function verificaDiferencaDatas(nomeCampo: string, mensagem: {}) {
  return check(nomeCampo).custom(data => {
    if (data.trim().length >= 1) {
      return check(nomeCampo, mensagem).custom(validadorDiferencaDatas);
    } else {
      return true;
    }
  });
}

export {
  campoObrigatorio,
  dataInicialValida,
  cpf,
  dataFinalValida,
  numeroDoCampoCartao,
  validaDDD,
  validaEmail,
  validaCelular,
  validaDiferencaDatas,
  excedeTamanho,
  formatoConteudoValido,
  arquivoPdfValido,
  arquivoJpgValido,
  arquivoPngValido,
  numeroCampoProtocolo,
  validaValorNumerico,
  verificaDiferencaDatas,
  validarCampoArray,
  ValidarDadosArray,
  validaValorDigitoConta
};
