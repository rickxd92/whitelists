interface Usuario {
	numeroCartao?: string;
	cpfNum?: string;
	cpfDv?: number;
	banco: string;
	agencia: string;
	digitoAgencia: string;
	conta: string;
	digitoConta: string;
	tipoConta?: string;
	nome: string;
	cartao?: string;
	email: string;
	dddTelefone?: string;
	numTelefone?: string;
	dddCelular: string;
	numCelular: string;
	podeAlterarDadosBancario: string;
	msgAlteracaoDadosBancario: string;
}

export { Usuario };
