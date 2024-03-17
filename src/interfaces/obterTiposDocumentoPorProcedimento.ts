import { ListaTipoDocumento } from './ListaTipoDocumento';

interface ListaMensagemObject {
  codigoMensagem: string;
  descricaoMensagem: string;
}

interface ObterTiposDocumentoPorProcedimentoResponse {
  listaMensagens: ListaMensagemObject[];
  listaTipoDocumento: ListaTipoDocumento[];
  valorLimiteDocObrigatorio?: string;
  error?: any;
}
export { ObterTiposDocumentoPorProcedimentoResponse };
