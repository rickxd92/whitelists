import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { getAtualizarAlphabotWhitelist } from '../controllers';
import swaggerSetupDocs from '../documentacao/swagger';
import { Rotas, configurarTimeout } from '../utils';

const router = Router();

router.use(swaggerUi.serve);
router.use(configurarTimeout);
router.get(`/${Rotas.documentacao}`, swaggerUi.setup(swaggerSetupDocs));
router.get(`/${Rotas.updateWhitelistsAlphabot}`, getAtualizarAlphabotWhitelist);

export default router;
