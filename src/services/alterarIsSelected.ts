import { alterarIsSelectedBd } from '../utils/funcoes/auxiliares';

function funcAlterarIsSelected({ bd, tabela, id, isSelected }) {
  return obterAlphabotWhitelistRest(bd, tabela, id, isSelected);
}

async function obterAlphabotWhitelistRest(bd: string, tabela: string, id: string, isSelected: boolean): Promise<any> {
  let respostaBff = {};

  try {
    await alterarIsSelectedBd(bd, tabela, id, isSelected);

    respostaBff = { status: 200, data: 'Executado com sucesso.' };

    return { respostaBff };
  } catch (error) {
    console.log('error', error);

    respostaBff = error ? error : '';

    return { respostaBff };
  }
}

export { funcAlterarIsSelected };
