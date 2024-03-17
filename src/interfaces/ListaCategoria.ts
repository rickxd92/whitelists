import { ListaProcedimento } from './ListaProcedimento';
interface ListaCategoria {
	codigoCategoria: number;
	nomeCategoria: string;
	listaProcedimento: ListaProcedimento[];
}

export { ListaCategoria };
