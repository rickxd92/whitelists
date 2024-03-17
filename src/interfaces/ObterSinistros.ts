interface ObterSinistros {
  tipoProcesso: number;
  numeroCartao: number;
  indicadorMaisRecente: number;
  dataInicio?: string;
  dataFim?: string;
  numeroSinistro?: string;
}

export { ObterSinistros };
