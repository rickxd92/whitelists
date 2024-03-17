import { ListaDocumentos } from 'interfaces';
import { ListaDespesas } from './ListaDespesas';
import { ListaRateios } from './ListaRateios';

interface SinistroReembolso {
  numeroCartao: number;
  tipoProcesso: string;
  canalEntrada: string;
  sequencialProcedimento: string;
  valorApresentado: string;
  indicadorCirurgiaSemProcedimento: string;
  listaDespesas: ListaDespesas[];
  listaRateios: ListaRateios[];
  listaDocumentos: ListaDocumentos[];
}

export { SinistroReembolso };
