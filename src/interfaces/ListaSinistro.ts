interface ListaSinistro {
  tipoSerie: string;
  numeroSinistroFormatado: string;
  nomeProcedimento: string;
  valorSolicitado: number;
  situacao: string;
  formaPagamento: string;
  cdSequencialSituacaoSerieSinistro: number;
  dataProcedimento: string;
  dataPagamento: string;
  podeIncluirComplemento: boolean;
  corIconeExibido: string;
  tipoProcesso: number;
}

export { ListaSinistro };
