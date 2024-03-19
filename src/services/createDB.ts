import { createTable } from '../utils/funcoes/auxiliares';

function funcCreateDB(dados) {
  return atualizarAlphabotWhitelistRest(dados);
}

async function atualizarAlphabotWhitelistRest(dados): Promise<any> {
  let respostaBff = {};
  const tabela = dados.tabela;
  const bd = dados.bd;

  try {
    // await createDB(bd);
    await createTable(tabela, bd);

    return { respostaBff: { status: 200, data: 'Executado com sucesso!' } };
  } catch (error) {
    console.log('error', error);

    respostaBff = error ? error : '';

    return { respostaBff };
  }
}

export { funcCreateDB };
