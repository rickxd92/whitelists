interface Beneficiario {
  cpfNum: string;
  cpfDv: string;
  banco: string;
  agencia: string;
  digitoAgencia: string;
  conta: string;
  digitoConta: string;
  tipoConta: string;
  nome: string;
  cartao: string;
  email: string;
  dddCelular: string;
  numCelular: string;
  podeAlterarDadosBancario: string;
  msgAlteracaoDadosBancario: string;
  indicadorPrecisaIDWall?: boolean;
  chaveSDK?: string;
  dtInicioVigenciaPlano: string;
  responsavel: {
    nome: string;
    cpfNum: string;
    cpfDv: string;
  };
}

export { Beneficiario };
