import { lerDadosBd } from '../utils/funcoes/auxiliares';

function obterAlphabotWhitelist() {
  return obterAlphabotWhitelistRest();
}

async function obterAlphabotWhitelistRest(): Promise<any> {
  let respostaBff = {};

  try {
    const dados = await lerDadosBd('alphabot');

    respostaBff = { status: 200, data: dados };

    return { respostaBff };
  } catch (error) {
    console.log('error', error);

    respostaBff = error ? error : '';

    return { respostaBff };
  }
}

export { obterAlphabotWhitelist };
