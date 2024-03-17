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

  semRetorno: (codigo: number) => ({
    status: 500,
    corpo: {
      codigo,
      resposta: {
        mensagem: 'Não foram retornados registros para a consulta realizada.'
      }
    }
  }),

  jsonInvalido: (codigo: number) => ({
    status: 500,
    corpo: { codigo, resposta: { mensagem: 'JSON informado inválido. Favor validar o JSON enviado!' } }
  }),

  mensagemGenerica: (codigo: number, mensagem: string) => ({
    status: 400,
    corpo: { codigo, resposta: { mensagem } }
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
