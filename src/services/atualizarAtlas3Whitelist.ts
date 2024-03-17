import axios from 'axios';
import { WhitelistAlphabot } from '../interfaces';
import { clearTable, inserirDadosBd } from '../utils/funcoes/auxiliares';

function atualizarAtlas3Whitelist() {
  return atualizarAtlas3WhitelistRest();
}

function obterOpcoes(pageNum = 0, pageSize = 30) {
  return {
    url: `https://atlas3.io/api/creator/all-giveaways?page=${pageNum}&pageLength=${pageSize}&search=&sortOption=entryCount_desc&filterOptions=`,
    headers: {
      'User-Agent': 'Google-Apps-Script/1.0',
      authority: 'atlas3.io',
      cookie:
        '__Secure-next-auth.session-token=22b7a777-efca-4730-b1cc-95724504e3e9; __Secure-next-auth.callback-url=https%3A%2F%2Fatlas3.io; __Host-next-auth.csrf-token=177ebbdbb94b90a37b90240e9fc38f7e421715448861e4c1e054072834fc9063%7C9e966abcf950219f0bf28caab7c516077455df6a62ee946542c6ed5d99a52c86; cf_clearance=imAuTLRNgh2jNemSFiF8qsqGssZCZxWF6Nn2sxzYqTM-1710208971-1.0.1.1-JEuOOMQrW14Oqc9hQDoqhv.57Rnz9cd7WdCF9r0GCOODcA2lh5ANx_0tmVZURdf6l7Tc4utKN8LI81J3m8eyLw'
    }
  };
}

async function atualizarAtlas3WhitelistRest(): Promise<any> {
  let respostaBff = {};
  let pageNum = 0;

  clearTable('atlas', 'whitelists');

  try {
    while (true) {
      console.log('Pagina atual: ', pageNum);
      const opcoes = obterOpcoes(pageNum);
      const url = opcoes.url;
      const headers = opcoes.headers;
      const dadosObj = [] as WhitelistAlphabot[];

      const { status, data } = await axios.get(url, { headers });

      if (data.giveaways.length === 0) {
        respostaBff = { status: 200, data: 'Executado com sucesso!' };
        break;
      }

      console.log('Quantidade de whitelist por pagina => ', data.giveaways.length);

      data.giveaways.forEach(item => {
        let typeGiveaway = item.collabType;
        let project = item.project;
        let collab = item.collabProject;

        let nome = '';
        let blockchain = '';
        let wlPrice = '';
        let supply = '';
        let discordUrl = '';
        let twitterUrl = '';
        let endDate = new Date(item.endsAt); // Convertendo para um objeto Date
        let qtdVencedores = item.maxWinners + '(' + (item.entryCount ? item.entryCount : '0') + ')';
        let slug = item.slug;
        let id = item.id;
        let plataforma = 'Atlas3';

        // Collab = RECEIVE_SPOTS
        // Project = GIVE_SPOTS
        // Extrair as informações desejadas
        if (typeGiveaway === 'RECEIVE_SPOTS') {
          nome = collab.name;
          blockchain = collab.network;
          wlPrice = collab.mintPrice ? collab.mintPrice : '';
          supply = collab.supply;
          discordUrl = collab.discordInviteUrl ? collab.discordInviteUrl : '';
          twitterUrl = collab.twitterUsername ? 'https://www.twitter.com/' + collab.twitterUsername : '';
        } else {
          nome = project.name;
          blockchain = project.network;
          wlPrice = project.mintPrice ? project.mintPrice : '';
          supply = project.supply;
          discordUrl = project.discordInviteUrl ? project.discordInviteUrl : '';
          twitterUrl = project.twitterUsername ? 'https://www.twitter.com/' + project.twitterUsername : '';
        }

        let urlCompleta = `https://atlas3.io/project/${project.slug}/giveaway/${slug}`;

        dadosObj.push({
          nome,
          endDate,
          blockchain,
          ogPrice: '',
          wlPrice: wlPrice ? wlPrice : '',
          pubPrice: '',
          supply: supply ? supply : '',
          qtdVencedores,
          slug,
          id,
          plataforma,
          precisaDiscordRole: false,
          discordRole: '',
          urlCompleta
        });
      });

      inserirDadosBd('atlas', dadosObj, 'whitelists');

      pageNum++;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return { respostaBff };
  } catch (error) {
    console.log('error', error);

    respostaBff = error ? error : '';

    return { respostaBff };
  }
}

export { atualizarAtlas3Whitelist };
