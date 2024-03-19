import { Request, Response } from 'express';
import { funcCreateDB } from '../services';

async function postCreateDB(req: Request, res: Response) {
  console.log('postCreateDB');
  const { respostaBff } = await funcCreateDB(req.body);
  res.status(respostaBff.status).json(respostaBff.data);
}

export { postCreateDB };
