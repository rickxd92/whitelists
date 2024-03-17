import axios from 'axios';

function atualizarAlphabotWhitelist() {
  const opcoes = obterOpcoes();

  return atualizarAlphabotWhitelistRest(opcoes);
}

function obterOpcoes() {
  return {
    url: `https://www.alphabot.app/api/projects?sort=newest&scope=all&showHidden=false&pageSize=2&pageNum=0&search=&project=&filter=`,
    headers: {
      authority: 'www.alphabot.app',
      cookie:
        '__Host-next-auth.csrf-token=8cfbfe14426b5b90605436cb25086e5cfb39d3024052746c4ee90c5ff92c19c5%7C905382a55ee30446a69c074816ae9a105b65cbcb37be485035cb769ed893a3f6; __Secure-next-auth.callback-url=https%3A%2F%2Fwww.alphabot.app%2F75x-cocklist-giveaway-s38zpn; cf_clearance=lfNvU80L6ZFzAnuVK1mFoKvWqYpEZoNANTqnIW7LG7U-1710079879-1.0.1.1-LJdHoNmQyXO3MdV.e1DjHIxkyb_.0dqgKF.jiOitPReDGikU9PhGIXDz19rAurC2WXJVE4M2AD4wMsLoO9tWzg; __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..X6o9DgiAlaPZJF18.gIjyMEZGMIT9D8jnbN-28X3awkd-FYozXTzWEh1BHHxjC-OJ-42EqBJMUlIvd6U2chpSTP_N5z4v9r-Rn-YKGSbfzir6gI_BQfF97zAExJqgVz7dwxsJ6djhyjoo-pINtSuBF2e6pRNRH5F7j53oS3lddY0y1uIfPQf9hKOOcQFg-S7ISJSNt-U5YbZ-B5t1bWY9wOzW-iEpI6Q5S0jBxf4VS0zrUAClDcQkqqoP_mKK9ixdUd0htX75TFO2B7AATo4iPwQdx19QisPbkUhjQotQ5QorElfyP0gm7w7_iU8BEener_6w3bdZNAULvN3uZrQ5GYgpCG0JNyS5nYxpuFMiTvikEq-m2sfT_tfB-eQrQA.z4g8o5TZfFqZpaf4ww0w5w'
    }
  };
}

async function atualizarAlphabotWhitelistRest({ url, headers }): Promise<any> {
  let respostaBff = {};
  let respostaLegado = {};

  try {
    console.log('url', url);
    const { status, data } = await axios.get(url, { headers });

    console.log('data', data);
    console.log('status', status);

    respostaBff = data;
    respostaLegado = status;

    return { respostaBff, respostaLegado };
  } catch (error) {
    console.log('error', error);

    respostaBff = error ? '' : '';
    respostaLegado = error ? '' : '';

    return { respostaBff, respostaLegado };
  }
}

export { atualizarAlphabotWhitelist };