import { Request, Response } from 'express';
import { atualizarAlphabotWhitelist } from '../services';

async function getAtualizarAlphabotWhitelist(req: Request, res: Response) {
  const body = req.body;
  console.log('getAtualizarAlphabotWhitelist');
  const { respostaBff } = await atualizarAlphabotWhitelist(body);
  res.status(respostaBff.status).json(respostaBff.data);
}

export { getAtualizarAlphabotWhitelist };
