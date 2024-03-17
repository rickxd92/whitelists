export interface SerieDocumento {
  numeroProtocolo: number;
  tipoProcesso: number;
  canalEntrada: number;
  listaDocumentos: ListaDocumentos[];
}
interface ListaDocumentos {
  seqTipoDocumento: number;
  listaAnexo: ListaAnexo[];
}

interface ListaAnexo {
  nomeFisico: string;
  conteudo: string;
  nomeArquivo: string;
}
