import { ListaAnexo } from './ListaAnexo';

interface ListaDocumentos {
  seqTipoDocumento: number;
  data: string;
  valor: string;
  listaAnexo: ListaAnexo[]
}

export { ListaDocumentos };
