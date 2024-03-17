interface ListaTipoDocumento {
  sequencialTipoDocumento: number;
  nomeTipoDocumento: string;
  possuiValorTipoDocumento: number;
  obrigatorioEnvioFisicoTipoDocumento: number;
  indicativoInformacaoPrestadorObrigatoriaTipoDoc: number;
  mensagemOptin: string;
  orientacaoTipoDocumento: string;
  indicativoDocumentoPrestador: number;
  mensagemValorOptin?: string;
  obrigatorioEnvioDocumento: number;
}

export { ListaTipoDocumento };
