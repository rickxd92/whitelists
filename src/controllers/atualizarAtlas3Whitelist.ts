import { Request, Response } from 'express';
import { atualizarAtlas3Whitelist } from '../services';

async function getAtualizarAtlasWhitelist(req: Request, res: Response) {
  console.log('getAtualizarAlphabotWhitelist');
  const { respostaBff } = await atualizarAtlas3Whitelist();
  res.status(respostaBff.status).json(respostaBff.data);
}

export { getAtualizarAtlasWhitelist };
