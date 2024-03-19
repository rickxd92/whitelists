import { Request, Response } from 'express';
import { obterAtlasWhitelist } from '../services';

async function getObterAtlasWhitelist(req: Request, res: Response) {
  console.log('getObterAtlasWhitelist');
  const { respostaBff } = await obterAtlasWhitelist();
  res.status(respostaBff.status).json(respostaBff.data);
}

export { getObterAtlasWhitelist };
