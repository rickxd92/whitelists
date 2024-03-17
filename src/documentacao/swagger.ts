import { alterarDadosBancariosDocs } from './apis/alterarDadosBancarios';

const swaggerSetupDocs = {
  swagger: '2.0',
  info: {
    version: '1.0.45',
    title: 'BSMO-BFF-SAUDEREEMBOLSO',
    license: {
      name: 'Bradesco Seguros S.A',
      url: 'https://www.bradescoseguros.com.br/clientes'
    }
  },
  host: `localhost:${process.env.EXTERNAL_PORT}`,
  basePath: `/${process.env.APP_NAME}`,
  tags: [
    {
      name: 'BSCSaudeReembolso',
      description: 'APIs de uso geral.'
    }
  ],
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    ...alterarDadosBancariosDocs
  }
};

export default swaggerSetupDocs;
