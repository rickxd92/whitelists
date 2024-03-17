import { Respostas } from './respostas';
import { Rotas } from './rotas';

const Erros = {
  [Rotas.dadosSegurado]: {
    'O número do cartão do beneficiário informado precisa ter 15 posições!': Respostas.numeroCartao(2),
    'Não foram retornados registros para a consulta realizada!': Respostas.semDados(3),
    'Beneficiário não cadastrado ou não possui apólice vigente!': Respostas.erroGenericoMapeado(
      4,
      'Beneficiário não cadastrado ou não possui apólice vigente!',
      404
    ),
    'O campo: numeroCartao não possui valor numérico!': Respostas.validaValorNumerico(6, 'numeroCartao')
  },
  [Rotas.alterarNotificacao]: {
    'É obrigatório informar o cartão do beneficiário!': Respostas.campoObrigatorioGenerico(
      1,
      'cartão do beneficiário!'
    ),
    'O número do cartão do beneficiário informado precisa ter 15 posições!': Respostas.numeroCartao(2),
    'É obrigatório informar o número do celular e o número do DDD para a alteração dos dados do celular!':
      Respostas.camposObrigCelularDDD(3),
    'Email informado é inválido.': Respostas.emailInvalido(4),
    'Celular informado não é valido!': Respostas.celularInvalido(5),
    'DDD do celular informado não é valido! O DDD informado precisa ter 2 posições.': Respostas.dddInvalido(5),
    'É obrigatório informar o email ou o celular.': Respostas.emailTelefoneInvalido(6)
  },
  [Rotas.obterProcedimento]: {
    'Tipo de processo não cadastrado!': Respostas.processoNaoCadastrado(2),
    'Não foram retornados registros para a consulta realizada.': Respostas.semRetorno(3)
  },
  [Rotas.listaDocumentosSinistro]: {
    'Número do Sinistro não é válido!': Respostas.erroSinistroInvalido(1),
    "O campo 'sinistro' é obrigatório.": Respostas.campoObrigatorio(2, 'numeroSinistro'),
    'Não foi encontrado nenhum Documento do Sinistro.': Respostas.sinistroNaoEncontrado(3)
  },
  [Rotas.listaSinistroPeriodo]: {
    'Número do Cartão do Segurado não é válido!': Respostas.cartaoInvalido(1),
    'Data inicial deve ser anterior à data final do período de busca!': Respostas.dataFinalAnterior(2),
    'O período de consulta não pode ser superior a 1 ano!': Respostas.periodoMuitoGrande(3),
    'CPF informado não é válido!': Respostas.cpfInvalido(4),
    'Datas informadas não são válidas!': Respostas.datasInvalidas(5),
    'Não foi encontrado nenhum Sinistro de Reembolso.': Respostas.sinistroNaoEncontradoNoPeriodo(6)
  },
  [Rotas.validarBeneficiarioReembolso]: {
    'O número do cartão do beneficiário informado precisa ter 15 posições!': Respostas.numeroCartaoBeneficiario(2),
    'Beneficiário não cadastrado!': Respostas.validarBeneficiarioReembolso(3, ' Beneficiário não cadastrado!'),
    'Beneficiário não cadastrado ou não possui apólice vigente!': Respostas.validarBeneficiarioReembolso(
      4,
      'Beneficiário não cadastrado ou não possui apólice vigente!'
    ),
    'Jason informado inválido. Favor validar o Jason enviado!': Respostas.jsonInvalido(5),
    'O campo: numeroCartao não possui valor numérico!': Respostas.validaValorNumerico(6, 'numeroCartao')
  },
  [Rotas.obterProcedimentosPorCategoria]: {
    'É obrigatório informar o tipo de processo!': Respostas.campoObrigatorioGenerico(1, 'o tipo de processo!'),
    'Tipo de processo não cadastrado!': Respostas.erroGenericoMapeado(2, 'Tipo de processo não cadastrado!'),
    'O campo: sequencialTipoProcesso não possui valor numérico!': Respostas.validaValorNumerico(
      4,
      'sequencialTipoProcesso'
    ),
    'Não foram retornados registros para a consulta realizada!': Respostas.erroGenericoMapeado(
      3,
      'Não foram retornados registros para a consulta realizada!',
      404
    )
  },
  [Rotas.obterTiposDocumentoPorProcedimento]: {
    'O campo: sequencialProcedimento não possui valor numérico!': Respostas.validaValorNumerico(
      5,
      'sequencialProcedimento'
    ),
    'Não foram retornados registros para a consulta realizada!': Respostas.semDados(4),
    'Procedimento não cadastrado!': Respostas.erroGenericoMapeado(2, 'Procedimento não cadastrado!', 404),
    'Datas informadas não são válidas!': Respostas.datasInvalidas(5),
    'O campo: sequencialTipoProcesso não possui valor numérico!': Respostas.erroGenericoMapeado(
      4,
      'O campo: sequencialTipoProcesso não possui valor numérico!',
      500
    ),
    'Tipo de processo não cadastrado!': Respostas.erroGenericoMapeado(2, 'Tipo de processo não cadastrado!')
  },
  [Rotas.validarProcedimentoReembolso]: {
    'Tipo de processo não cadastrado!': Respostas.erroGenericoMapeado(1, 'Tipo de processo não cadastrado!'),
    'Procedimento não cadastrado': Respostas.erroGenericoMapeado(2, 'Procedimento não cadastrado', 404)
  },
  [Rotas.excluirAnexoDocumento]: {
    'Arquivo não encontrado no File Server!': Respostas.erroGenericoMapeado(
      1,
      'Arquivo não encontrado no File Server!'
    ),
    'É necessário informar o nome do arquivo físico para a exclusão do anexo!': Respostas.erroGenericoMapeado(
      2,
      'É necessário informar o nome do arquivo  físico para a exclusão do anexo!'
    )
  },
  [Rotas.incluirAnexoDocumento]: {
    'É obrigatório informar o cartão do beneficiário!': Respostas.numeroCartaoObrig(1),
    'O número do cartão do beneficiário informado precisa ter 15 posições!': Respostas.numeroCartaoBeneficiario(2),
    'Quantidade de anexos é superior a quantidade permitida de 3 anexos por recibo ou nota fiscal!':
      Respostas.erroGenericoMapeado(
        3,
        'Quantidade de anexos é superior a quantidade permitida de 3 anexos por recibo ou nota fiscal!',
        500
      ),
    'Quantidade de anexos é superior a quantidade permitida de 3 anexos por documento não valorado!':
      Respostas.erroGenericoMapeado(
        4,
        'Quantidade de anexos é superior a quantidade permitida de 3 anexos por documento não valorado!',
        500
      ),
    'É necessário informar o conteúdo para anexar arquivo!': Respostas.campoObrigatorioConteudo(5),
    'É necessário informar o nome do arquivo para anexar!': Respostas.campoObrigatorioNome(6),
    'O arquivo anexado não pode ser maior que 1.2 Mb!': Respostas.excedeLimiteTamanho(7),
    'O arquivo anexado precisa conter as extensões jpg, jpeg, png e pdf!': Respostas.formatoArquivoInvalido(8),
    'Arquivo pdf inválido ou corrompido. Favor anexar um PDF válido!': Respostas.arquivoPdfInvalido(9),
    'Arquivo jpg inválido ou corrompido. Favor anexar um jpg válido!': Respostas.arquivoJpgInvalido(10),
    'Não foi possível realizar a gravação do anexo no file server. A inclusão do reembolso deverá ser concluída com o respectivo conteúdo dos arquivo!':
      Respostas.erroGenericoMapeado(
        11,
        'Não foi possível realizar a gravação do anexo no file server. A inclusão do reembolso deverá ser concluída com o respectivo conteúdo dos arquivo!',
        500
      ),
    'Atenção! Você atingiu o limite máximo de 3 arquivos anexados. Para anexar novos arquivos, por favor, exclua um ou mais arquivo anexado.':
      Respostas.erroGenericoMapeado(
        12,
        'Atenção! Você atingiu o limite máximo de 3 arquivos anexados. Para anexar novos arquivos, por favor, exclua um ou mais arquivo anexado.',
        500
      ),
    'Atenção! Você atingiu o limite máximo de 10 arquivos anexados. Para anexar novos arquivos, por favor, exclua um ou mais arquivo anexado.':
      Respostas.erroGenericoMapeado(
        12,
        'Atenção! Você atingiu o limite máximo de 10 arquivos anexados. Para anexar novos arquivos, por favor, exclua um ou mais arquivo anexado.',
        500
      )
  },
  [Rotas.consultarPosicaoAtualReembolso]: {
    'O número do protocolo do reembolso informado precisa ter 16 posições!': Respostas.erroGenericoMapeado(
      2,
      'O número do protocolo do reembolso informado precisa ter 16 posições!'
    ),
    'O número do protocolo do reembolso não cadastrado!': Respostas.erroGenericoMapeado(
      3,
      'O número do protocolo do reembolso não cadastrado!'
    )
  },
  [Rotas.obterSinistros]: {
    'É obrigatório informar o cartão do beneficiário!': Respostas.numeroCartaoObrig(1),
    'O número do cartão do beneficiário informado precisa ter 15 posições!': Respostas.numeroCartaoBeneficiario(2),
    'É obrigatório informar o tipo de processo!': Respostas.processoObrigatorio(3),
    'Tipo de Processo informado não é válido!': Respostas.processoInvalido(4),
    'O período de datas ou o número do protocolo precisam ser informados!': Respostas.erroGenericoMapeado(
      5,
      'O período de datas ou o número do protocolo precisam ser informados!'
    ),
    'Não foram retornados registros para a consulta realizada!': Respostas.semDados(
      6,
      'Não há solicitações de reembolso dentro dos critérios selecionados. Por favor, tente novamente.'
    ),
    'Data inválida!': Respostas.erroGenericoMapeado(7, 'Data inválida!'),
    'O período de consulta não pode ser superior a 1 ano!': Respostas.erroGenericoMapeado(
      8,
      'O período de consulta não pode ser superior a 1 ano!'
    ),
    'O número do protocolo do reembolso informado precisa ter 16 posições!': Respostas.erroGenericoMapeado(
      9,
      'O número do protocolo do reembolso informado precisa ter 16 posições!'
    ),
    'Data inicial deve ser anterior à Data final do período de busca!': Respostas.erroGenericoMapeado(
      10,
      'Data inicial deve ser anterior à Data final do período de busca!'
    ),
    'Não há solicitações de reembolso dentro dos critérios selecionados, Por favor, tente novamente.':
      Respostas.erroGenericoMapeado(11, 'Não há solicitações de reembolso dentro dos critérios selecionados.')
  },
  [Rotas.incluirSinistroReembolso]: {
    'Ocorreram problemas na gravação de um ou mais arquivos anexados. É necessário anexar novamente para a finalização da solicitação do reembolso.':
      Respostas.erroGenericoMapeado(
        3,
        'Ocorreram problemas na gravação de um ou mais arquivos anexados. É necessário anexar novamente para a finalização da solicitação do reembolso.'
      ),
    'Serviço indisponível no momento!': Respostas.erroGenericoMapeado(4, 'Serviço indisponível no momento!'),
    'O Procedimento informado não está parametrizado para o canal de entrada do reembolso a ser incluído!':
      Respostas.erroGenericoMapeado(
        5,
        'O Procedimento informado não está parametrizado para o canal de entrada do reembolso a ser incluído!'
      ),
    'É necessário informar o canal de entrada do reembolso a ser incluído!': Respostas.erroGenericoMapeado(
      6,
      'É necessário informar o canal de entrada do reembolso a ser incluído!'
    ),
    'É obrigatório informar o tipo de processo!': Respostas.erroGenericoMapeado(
      7,
      'É obrigatório informar o tipo de processo!'
    ),
    'Tipo de Processo informado não é válido!': Respostas.erroGenericoMapeado(
      8,
      'Tipo de Processo informado não é válido!'
    ),
    'É obrigatório informar o cartão do beneficiário!': Respostas.erroGenericoMapeado(
      9,
      'É obrigatório informar o cartão do beneficiário!'
    ),
    'O número do cartão do beneficiário informado precisa ter 15 posições!': Respostas.erroGenericoMapeado(
      10,
      'O número do cartão do beneficiário informado precisa ter 15 posições!'
    ),
    'Beneficiário não cadastrado!': Respostas.erroGenericoMapeado(11, 'Beneficiário não cadastrado!'),
    'Beneficiário não cadastrado ou não possui apólice vigente!': Respostas.erroGenericoMapeado(
      12,
      'Beneficiário não cadastrado ou não possui apólice vigente!'
    ),
    'É obrigatório informar o procedimento!': Respostas.erroGenericoMapeado(
      13,
      'É obrigatório informar o procedimento!'
    ),
    'É obrigatório informar ao menos um documento!': Respostas.erroGenericoMapeado(
      14,
      'É obrigatório informar ao menos um documento!'
    ),
    'Tipo de documento não informado!': Respostas.erroGenericoMapeado(15, 'Tipo de documento não informado!'),
    'Tipo de documento não cadastrado para o procedimento selecionado!': Respostas.erroGenericoMapeado(
      16,
      'Tipo de documento não cadastrado para o procedimento selecionado!'
    ),
    'Os campos data e valor são obrigatórios para o tipo de documento Recibo ou Nota fiscal!':
      Respostas.erroGenericoMapeado(
        17,
        'Os campos data e valor são obrigatórios para o tipo de documento Recibo ou Nota fiscal!'
      ),
    'Data do Documento informado não é válida!': Respostas.erroGenericoMapeado(
      18,
      'Data do Documento informado não é válida!'
    ),
    'Data do Documento deve ser anterior à data atual!': Respostas.erroGenericoMapeado(
      19,
      'Data do Documento deve ser anterior à data atual!'
    ),
    'Data do Documento não pode ser anterior à 1 ano!': Respostas.erroGenericoMapeado(
      20,
      'Data do Documento não pode ser anterior à 1 ano!'
    ),
    'É necessário enviar ao menos um anexo para cada tipo de documento informado!': Respostas.erroGenericoMapeado(
      21,
      'É necessário enviar ao menos um anexo para cada tipo de documento informado!'
    ),
    'É necessário enviar ao menos um recibo ou nota fiscal para a solicitação de reembolso!':
      Respostas.erroGenericoMapeado(
        22,
        'É necessário enviar ao menos um recibo ou nota fiscal para a solicitação de reembolso!'
      ),
    'O nome do arquivo físico ou o conteúdo do arquivo são obrigatórios!': Respostas.erroGenericoMapeado(
      23,
      'O nome do arquivo físico ou o conteúdo do arquivo são obrigatórios!'
    ),
    'O conteúdo do arquivo não pode ser informado quando informar o nome do arquivo Físico!':
      Respostas.erroGenericoMapeado(
        24,
        'O conteúdo do arquivo não pode ser informado quando informar o nome do arquivo Físico!'
      ),
    'O arquivo anexado não pode ser maior que 1.2 Mb!': Respostas.erroGenericoMapeado(
      25,
      'O arquivo anexado não pode ser maior que 1.2 Mb!'
    ),
    'O arquivo anexado precisa conter as extensões jpg e pdf!': Respostas.erroGenericoMapeado(
      26,
      'O arquivo anexado precisa conter as extensões jpg e pdf!'
    ),
    'Arquivo pdf inválido ou corrompido. Favor anexar um PDF válido!': Respostas.erroGenericoMapeado(
      27,
      'Arquivo pdf inválido ou corrompido. Favor anexar um PDF válido!'
    ),
    'Arquivo jpg inválido ou corrompido. Favor anexar um arquivo jpg válido!': Respostas.erroGenericoMapeado(
      28,
      'Arquivo jpg inválido ou corrompido. Favor anexar um arquivo jpg válido!'
    ),
    'Sequencial do procedimento médico informado não cadastrado!': Respostas.erroGenericoMapeado(
      29,
      'Sequencial do procedimento médico informado não cadastrado!'
    ),
    'Atenção! Você atingiu o limite máximo de 12 documentos. Para anexar novos arquivos, por favor, exclua um ou mais documentos.!':
      Respostas.erroGenericoMapeado(
        30,
        'Você atingiu o limite máximo de 12 documentos. Para anexar novos arquivos, por favor, exclua um ou mais documentos.!'
      )
  },
  [Rotas.obterListaProfissionais]: {
    'Serviço indisponível no momento!': Respostas.sistemaIndisponivel
  },
  [Rotas.incluirSerieComplemento]: {
    'É obrigatório informar o Tipo de Processo!': Respostas.erroGenericoMapeado(
      3,
      'É obrigatório informar o Tipo de Processo!'
    ),
    'É necessário anexar novamente o arquivo para o tipo de documento -> 22 ou informar o conteúdo do arquivo. O nome do arquivo físico informado não foi encontrado no servidor!':
      Respostas.erroGenericoMapeado(
        4,
        'É necessário anexar novamente o arquivo para o tipo de documento -> 22 ou informar o conteúdo do arquivo. O nome do arquivo físico informado não foi encontrado no servidor!'
      ),
    'Reembolso do protocolo informado não está com a situação aguardando entrega de documentos complementares!':
      Respostas.erroGenericoMapeado(
        5,
        'Reembolso do protocolo informado não está com a situação aguardando entrega de documentos complementares!'
      ),
    'O número do protocolo do reembolso informado precisa ter 16 posições!': Respostas.erroGenericoMapeado(
      6,
      'O número do protocolo do reembolso informado precisa ter 16 posições!'
    ),
    'É necessário anexar novamente o arquivo para o tipo de documento ': Respostas.erroGenericoMapeado(
      7,
      'É necessário anexar novamente o arquivo para o tipo de documento'
    )
  },
  [Rotas.obterCartaResultadoReembolso]: {
    'O número do protocolo do reembolso não cadastrado ou não possui carta resultado do reembolso gerada!':
      Respostas.erroGenericoMapeado(
        2,
        'O número do protocolo do reembolso não cadastrado ou não possui carta resultado do reembolso gerada!'
      )
  },
  [Rotas.obterConteudoCartaResultado]: {
    'O número do protocolo do reembolso não cadastrado ou não possui carta resultado do reembolso gerada!':
      Respostas.erroGenericoMapeado(
        3,
        'O número do protocolo do reembolso não cadastrado ou não possui carta resultado do reembolso gerada!'
      )
  },
  [Rotas.updateWhitelistsAlphabot]: {
    'Dados da conta inválidos. Favor verificar.': Respostas.erroGenericoMapeado(
      2,
      'Dados da conta inválidos. Favor verificar.'
    ),
    'CPF NAO CONFERE': Respostas.erroGenericoMapeado(
      2,
      'A conta corrente informada não corresponde ao CPF do Segurado.'
    ),
    'DV CONTA CORRENTE INVALIDO': Respostas.erroGenericoMapeado(3, 'Esse dígito está inválido.'),
    'AGENCIA INEXISTENTE': Respostas.erroGenericoMapeado(4, 'Essa agência não foi encontrada.'),
    'SEGURADO NAO EXISTE': Respostas.erroGenericoMapeado(5, 'Esse segurado não existe nos nossos dados.'),
    'BANCO NAO AUTORIZADO CREDITO REEMBOLSO': Respostas.erroGenericoMapeado(
      100,
      'Banco não autorizado para recebimento de reembolso. Por favor, cadastre uma nova conta.'
    )
  },
  [Rotas.cancelarAvisoSinistro]: {
    'Reembolso não cadastrado.': Respostas.erroGenericoMapeado(100, 'Reembolso não cadastrado.'),
    'O campo: numeroSinistro não possui valor numérico!': Respostas.erroGenericoMapeado(
      100,
      'O campo: numeroSinistro não possui valor numérico!'
    ),
    "O campo 'numeroSinistro' é obrigatório.": Respostas.erroGenericoMapeado(
      100,
      "O campo 'numeroSinistro' é obrigatório."
    )
  }
};

export { Erros };
