import { listaProcedimentoPorCategoria } from './listaProcedimentoPorCategoria';

interface ProcedimentoPorCategoria {
  codigoCategoria: string;
  nomeCategoria: string;
  listaProcedimento: listaProcedimentoPorCategoria[];
}

export { ProcedimentoPorCategoria };
