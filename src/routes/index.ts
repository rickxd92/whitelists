import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import {
  alterarIsSelected,
  getAtualizarAlphabotWhitelist,
  getAtualizarAtlasWhitelist,
  getObterAlphabotWhitelist,
  getObterAtlasWhitelist,
  postCreateDB
} from '../controllers';
import { Rotas } from '../utils';

const router = Router();

router.use(swaggerUi.serve);
router.post(`/${Rotas.updateWhitelistsAlphabot}`, getAtualizarAlphabotWhitelist);
router.post(`/${Rotas.updateWhitelistsAtlas}`, getAtualizarAtlasWhitelist);
router.get(`/${Rotas.obterAlphabotWhitelist}`, getObterAlphabotWhitelist);
router.get(`/${Rotas.obterAtlasWhitelist}`, getObterAtlasWhitelist);
router.post(`/${Rotas.createDB}`, postCreateDB);
router.post(`/${Rotas.alterarIsSelected}`, alterarIsSelected);

export default router;
