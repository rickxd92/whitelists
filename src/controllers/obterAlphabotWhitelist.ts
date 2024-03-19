import { Request, Response } from 'express';
import { obterAlphabotWhitelist } from '../services';

async function getObterAlphabotWhitelist(req: Request, res: Response) {
  console.log('getObterAlphabotWhitelist');
  const { respostaBff } = await obterAlphabotWhitelist();
  res.status(respostaBff.status).json(respostaBff.data);
}

export { getObterAlphabotWhitelist };
