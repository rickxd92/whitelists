import { Request, Response } from 'express';
import { funcAlterarIsSelected } from '../services';

async function alterarIsSelected(req: Request, res: Response) {
  console.log('alterarIsSelected');
  const { respostaBff } = await funcAlterarIsSelected(req.body);
  res.status(respostaBff.status).json(respostaBff.data);
}

export { alterarIsSelected };
