import { Respostas } from '../../utils';

const alterarDadosBancariosDocs = {
  '/alterarDadosBancarios': {
    post: {
      tags: ['BSCSaudeReembolso'],
      description: 'Altera os dados bancários.',
      parameters: [
        {
          name: 'body',
          in: 'body',
          required: ['REQUIRED'],
          schema: {
            type: 'object',
            properties: {
              agencia: {
                type: 'string'
              },
              banco: {
                type: 'string'
              },
              conta: {
                type: 'string'
              },
              cpfDv: {
                type: 'string'
              },
              cpfNum: {
                type: 'string'
              },
              digitoConta: {
                type: 'string'
              },
              numeroCartao: {
                type: 'string'
              },
              tipoConta: {
                type: 'string'
              }
            }
          }
        }
      ],
      responses: {
        '200': {
          description: 'Sucesso!',
          examples: {
            'application/json': {
              codigo: 0,
              resposta: 'Sucesso'
            }
          }
        },
        '200.10': {
          description: 'Sucesso!',
          examples: {
            'application/json': {
              codigo: 10,
              resposta: {
                mensagem: 'Possivel retorno de erro'
              }
            }
          }
        },
        '400.1': {
          description: 'É obrigatório informar o cartão do beneficiário para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '400.2': {
          description: 'O número do cartão do beneficiário informado precisa ter 15 posições e ser numérico!',
          examples: {
            'application/json': ''
          }
        },
        '404.3': {
          description:
            'É obrigatório informar o CPF completo com digito verificador para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '404.4': {
          description: 'É obrigatório informar o Banco para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '404.5': {
          description: 'É obrigatório informar a Agência para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '404.6': {
          description: 'É obrigatório informar a Conta Corrente para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '404.7': {
          description: 'É obrigatório informar o dv da Conta Corrente para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '404.8': {
          description: 'É obrigatório informar o Tipo de Conta Corrente para a alteração dos dados bancários!',
          examples: {
            'application/json': ''
          }
        },
        '500.99': {
          description: 'Desculpe, estamos com problemas técnicos. Tente novamente daqui alguns minutos.',
          examples: {
            'application/json': Respostas.sistemaIndisponivel(99).corpo
          }
        }
      }
    }
  }
};

export { alterarDadosBancariosDocs };
