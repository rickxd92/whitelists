import { Request, Response } from 'express';
import { atualizarAlphabotWhitelist } from '../services';

async function getAtualizarAlphabotWhitelist(req: Request, res: Response) {
  console.log('getAtualizarAlphabotWhitelist');
  const { respostaBff } = await atualizarAlphabotWhitelist();
  res.status(respostaBff.status).json(respostaBff.data);
}

export { getAtualizarAlphabotWhitelist };
