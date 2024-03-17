import { ListaSinistro } from 'interfaces/ListaSinistro';
import {
  Beneficiario,
  Conselhos,
  EspecialidadeProcedimento,
  ListaCategoria,
  ListaDocumentoProcedimento,
  ListaDocumentoSinistro,
  ListaEventoProcedimento,
  ListaTipoDocumento,
  ProcedimentoPorCategoria,
  SinistrosPeriodo,
  TipoPrestador,
  UnidadeFederativa,
  Usuario
} from '../../interfaces';

const Respostas = {
  sistemaIndisponivel: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Desculpe, estamos com problemas técnicos. Tente novamente daqui alguns minutos.'
      }
    }
  }),

  campoObrigatorio: (codigo: number, campo: string) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: `O campo '${campo}' é obrigatório.`
      }
    }
  }),

  camposObrigatorios: (codigo: number, campo: string) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: `Os campos '${campo}' são obrigatório.`
      }
    }
  }),

  telefoneObrigatorio: (codigo: number, campo: string) => ({
    status: 400,
    corpo: { codigo, mensagem: `O campo '${campo}' é obrigatório.` }
  }),

  numeroCartaoBeneficiario: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'O número do cartão do beneficiário informado precisa ter 15 posições e ser numérico!'
      }
    }
  }),

  campoObrigatorioDDD: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'DDD do celular informado não é valido! O DDD informado precisa ter 2 posições.'
      }
    }
  }),

  numeroCartao: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'O número do cartão do beneficiário informado precisa ter 15 posições!'
      }
    }
  }),

  semDados: (codigo: number, mensagemCustomizada?: string) => {
    const mensagem = mensagemCustomizada || 'Não foram retornados registros para a consulta realizada!';

    return {
      status: 500,
      corpo: {
        codigo,
        resposta: {
          mensagem
        }
      }
    };
  },

  dadosUsuario: (codigo: number, dadosBeneficiario: Usuario) => ({
    status: 200,
    corpo: { codigo, resposta: dadosBeneficiario }
  }),

  alterarNotificacao: (codigo: number) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Serviço executado com sucesso!'
      }
    }
  }),

  incluirSerieComplementoSucesso: (codigo: number) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Serviço executado com sucesso!'
      }
    }
  }),

  erroIncluirSerieComplemento: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É necessário anexar novamente o arquivo para o tipo de documento'
      }
    }
  }),

  recebeProcedimentoReembolso: (codigo: number) => ({
    status: 200,
    corpo: { codigo, resposta: 'Sucesso' }
  }),

  cartaResultadoSucesso: (codigo: number, conteudo) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        conteudo: conteudo
      }
    }
  }),

  sucessoAlterarDadosBancarios: (codigo: number) => ({
    status: 200,
    corpo: { codigo, resposta: 'Sucesso' }
  }),

  camposObrigCelularDDD: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É obrigatório informar o número do celular e o número do DDD para a alteração dos dados do celular!'
      }
    }
  }),

  numeroCartaoObrig: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É obrigatório informar o cartão do beneficiário!'
      }
    }
  }),

  campoObrigatorioGenerico: (codigo: number, campo: string) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: `É obrigatório informar o ${campo}`
      }
    }
  }),

  campoObrigatorioCelular: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Celular informado não é valido!'
      }
    }
  }),

  campoObrigatorioEmail: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'E-mail informado é inválido!'
      }
    }
  }),

  emailInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'E-mail informado é inválido!'
      }
    }
  }),

  celularInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Celular informado não é valido!'
      }
    }
  }),

  dddInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'DDD do celular informado não é valido! O DDD informado precisa ter 2 posições.'
      }
    }
  }),

  emailTelefoneInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É obrigatório informar o email ou o celular.'
      }
    }
  }),

  obterProcedimento: (codigo: number, listaCategorias: ListaCategoria[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaCategorias
    }
  }),

  processoNaoCadastrado: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Tipo de processo não cadastrado!'
      }
    }
  }),

  semRetorno: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Não foram retornados registros para a consulta realizada.'
      }
    }
  }),

  obterTipoPrestador: (codigo: number, listaTipoPrestador: TipoPrestador[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaTipoPrestador
    }
  }),

  listaUF: (codigo: number, listaUFs: UnidadeFederativa[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaUFs
    }
  }),

  obterTipoProcedimento: (codigo: number, listaDocumentos: ListaDocumentoProcedimento[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaDocumentos
    }
  }),

  listaConselhos: (codigo: number, listaConselhos: Conselhos[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaConselhos
    }
  }),

  listaEspecialidades: (codigo: number, listaEspecialidades: EspecialidadeProcedimento[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaEspecialidades
    }
  }),

  listaSinistrosPeriodo: (codigo: number, listaSinistros: SinistrosPeriodo[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaSinistros
    }
  }),

  validaDadosSinistroPorPeriodo: (codigo: number, mensagem: string) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem
      }
    }
  }),

  obterEventoProcedimento: (codigo: number, listaEventosPorProcedimento: ListaEventoProcedimento[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaEventosPorProcedimento
    }
  }),

  obterDocumentoSinistro: (codigo: number, listaDocumentos: ListaDocumentoSinistro[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaDocumentos
    }
  }),

  erroSinistroInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Número do Sinistro não é válido!'
      }
    }
  }),

  sinistroNaoEncontrado: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Não foi encontrado nenhum Documento do Sinistro.'
      }
    }
  }),

  sinistroNaoEncontradoNoPeriodo: (codigo: number) => ({
    status: 404,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Não foi encontrado nenhum sinistro de reembolso para o período informado.'
      }
    }
  }),

  cartaoInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Número do Cartão do Segurado não é válido!'
      }
    }
  }),

  dataFinalAnterior: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Data inicial deve ser anterior à data final do período de busca!'
      }
    }
  }),

  periodoMuitoGrande: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'O período de consulta não pode ser superior a 1 ano!'
      }
    }
  }),

  cpfInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'CPF informado não é válido!'
      }
    }
  }),

  datasInvalidas: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Datas informadas não são válidas!'
      }
    }
  }),

  dataInvalida: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Data inválida a data inicial deve ser anterior à data final'
      }
    }
  }),

  dataInicialInvalida: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem:
          'Data inválida: a data de inicial não pode ser maior que a data de hoje e o formato deve ser yyyy-mm-dd'
      }
    }
  }),

  benefeciarioReembolsoValido: () => ({
    status: 200,
    corpo: {
      codigo: 0,
      resposta: {
        status: 'sucesso'
      }
    }
  }),

  validarBeneficiarioReembolso: (codigo: number, mensagem: string) => ({
    status: 404,
    corpo: { codigo, resposta: { mensagem } }
  }),

  jsonInvalido: (codigo: number) => ({
    status: 500,
    corpo: { codigo, resposta: { mensagem: 'JSON informado inválido. Favor validar o JSON enviado!' } }
  }),

  listaProcedimentoPorCategoria: (codigo: number, listaCategoria: ProcedimentoPorCategoria[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaCategoria
    }
  }),

  listaTipoDocumento: (
    codigo: number,
    valorLimiteDocObrigatorio: number,
    listaTipoDocumento: ListaTipoDocumento[]
  ) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        listaTipoDocumento,
        valorLimiteDocObrigatorio
      }
    }
  }),

  listaTipoDocumentoSemCartao: (codigo: number, listaTipoDocumento: ListaTipoDocumento[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaTipoDocumento
    }
  }),

  erroGenericoMapeado: (codigo: number, mensagem: string, status = 400) => ({
    status,
    corpo: {
      codigo,
      resposta: { mensagem }
    }
  }),

  mensagemGenerica: (codigo: number, mensagem: string) => ({
    status: 400,
    corpo: { codigo, resposta: { mensagem } }
  }),

  erroGenericoBuscarSinistro: (codigo: number, mensagem: string) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        mensagem,
        serieSinistros: []
      }
    }
  }),

  obterDadosSegurado: (codigo: number, dadosBeneficiarioSaude: Beneficiario[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: dadosBeneficiarioSaude
    }
  }),

  validaDadosBancarios: (codigo: number, campo: string) => ({
    status: 400,
    corpo: { codigo, resposta: { mensagem: `É obrigatório informar ${campo} para a alteração dos dados bancários!` } }
  }),

  validaValorNumerico: (codigo: number, campo: string) => ({
    status: 400,
    corpo: { codigo, resposta: { mensagem: `O campo: ${campo} deve ser numérico` } }
  }),

  validaDadosBancariosValorNumerico: (codigo: number) => ({
    status: 400,
    corpo: { codigo, resposta: { mensagem: 'Os campos devem ser numéricos' } }
  }),

  validaDadosBancariosValorDigitoConta: (codigo: number) => ({
    status: 400,
    corpo: { codigo, resposta: { mensagem: 'O dígito da conta está inválido' } }
  }),

  erroNomeFisico: (codigo: number) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É necessário informar o nome do arquivo físico para a exclusão do anexo!'
      }
    }
  }),

  excluirAnexoDocumentoSucesso: (codigo: number) => ({
    status: 200,
    corpo: { codigo, resposta: 'Sucesso' }
  }),

  obterSinistros: (codigo: number, listaSinistro: ListaSinistro[]) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: listaSinistro
    }
  }),

  incluirAnexoDocumento: (codigo: number, nomeFisico: string) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: { nomeFisico }
    }
  }),

  campoObrigatorioConteudo: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É necessário informar o conteúdo para anexar arquivo!'
      }
    }
  }),

  processoObrigatorio: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É obrigatório informar o tipo de processo!'
      }
    }
  }),

  campoObrigatorioNome: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'É necessário informar o nome do arquivo para anexar!'
      }
    }
  }),

  excedeLimiteTamanho: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'O arquivo anexado não pode ser maior que 1.2 Mb!'
      }
    }
  }),

  semApolice: (codigo: number, erroLegado: string) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: erroLegado
      }
    }
  }),

  processoInvalido: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Tipo de Processo informado não é válido!'
      }
    }
  }),

  formatoArquivoInvalido: (codigo: number) => ({
    status: 400,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'O arquivo anexado precisa conter as extensões jpg, jpeg, png e pdf!'
      }
    }
  }),

  arquivoJpgInvalido: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: `Arquivo jpg inválido ou corrompido. Favor anexar um arquivo jpg válido!`
      }
    }
  }),

  arquivoPdfInvalido: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: `Arquivo pdf inválido ou corrompido. Favor anexar um arquivo PDF válido!`
      }
    }
  }),

  consultarPosicaoReembolso: (codigo: number, resposta) => ({
    status: 200,
    corpo: {
      codigo,
      resposta
    }
  }),

  incluirSinistroReembolsoSucesso: (codigo: number, numeroSinistro: string, msg: string) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        numeroSinistro: numeroSinistro,
        mensagemReembolso: msg
      }
    }
  }),

  returnoSucessoJSON: dados => ({
    status: 200,
    corpo: {
      codigo: '0',
      resposta: dados
    }
  }),

  mensagemErro: mensagem => ({
    status: 400,
    corpo: {
      codigo: '400',
      resposta: {
        mensagem: mensagem
      }
    }
  }),

  mensagemSucesso: (previaRequerAnalise: boolean, mensagem: string) => ({
    status: 200,
    corpo: {
      codigo: '0',
      resposta: {
        previaRequerAnalise: previaRequerAnalise,
        mensagem: mensagem
      }
    }
  }),

  cancelarAvisoSinistro: (codigo: number, msg: string) => ({
    status: 200,
    corpo: {
      codigo,
      resposta: {
        mensagem: msg
      }
    }
  }),

  mensagemSucessoCodigo100: (mensagem: string) => ({
    status: 200,
    corpo: {
      codigo: 10,
      resposta: {
        mensagem: mensagem
      }
    }
  })
};

export { Respostas };
