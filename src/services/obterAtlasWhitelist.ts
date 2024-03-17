import { lerDadosBd } from '../utils/funcoes/auxiliares';

function obterAtlasWhitelist() {
  return obterAtlasWhitelistRest();
}

async function obterAtlasWhitelistRest(): Promise<any> {
  let respostaBff = {};

  try {
    const dados = await lerDadosBd('atlas');

    respostaBff = { status: 200, data: dados };

    return { respostaBff };
  } catch (error) {
    console.log('error', error);

    respostaBff = error ? error : '';

    return { respostaBff };
  }
}

export { obterAtlasWhitelist };
