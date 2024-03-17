import { gravarLog } from '../libs';
import { atualizarAlphabotWhitelist } from '../services';
import { Rotas } from '../utils';

async function getAtualizarAlphabotWhitelist() {
  console.log('getAtualizarAlphabotWhitelist');
  // const dadosBancarios = req.body;
  const { respostaBff, respostaLegado } = await atualizarAlphabotWhitelist();
  // res.status(respostaBff.status).json(respostaBff.corpo);
  gravarLog(Rotas.validarProcedimentoReembolso, respostaBff, respostaLegado);
}

export { getAtualizarAlphabotWhitelist };
