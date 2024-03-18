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
import swaggerSetupDocs from '../documentacao/swagger';
import { Rotas, configurarTimeout } from '../utils';

const router = Router();

router.use(swaggerUi.serve);
router.use(configurarTimeout);
router.get(`/${Rotas.documentacao}`, swaggerUi.setup(swaggerSetupDocs));
router.get(`/${Rotas.updateWhitelistsAlphabot}`, getAtualizarAlphabotWhitelist);
router.get(`/${Rotas.updateWhitelistsAtlas}`, getAtualizarAtlasWhitelist);
router.get(`/${Rotas.obterAlphabotWhitelist}`, getObterAlphabotWhitelist);
router.get(`/${Rotas.obterAtlasWhitelist}`, getObterAtlasWhitelist);
router.post(`/${Rotas.createDB}`, postCreateDB);
router.post(`/${Rotas.alterarIsSelected}`, alterarIsSelected);

export default router;
