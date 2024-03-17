import { NextFunction, Request, Response } from 'express';
import { WhitelistAlphabot } from 'interfaces';
import { gravarLog } from '../../libs';
import { Respostas } from '../consts';
require('dotenv').config();
const { Client } = require('pg');

function connectionCreate(dataBase: string, create: boolean = false) {
  if (create) {
    return new Client({
      user: 'postgres',
      password: '#Amora@157#',
      host: 'localhost',
      port: 5432
    });
  }

  return new Client({
    user: 'postgres',
    password: '#Amora@157#',
    database: dataBase,
    host: 'localhost',
    port: 5432
  });
}

async function createDB(bd: string) {
  if (bd) {
    const client = connectionCreate(bd, true);

    console.log('Conectando ao banco.');

    try {
      await client.connect();
      // Verificar se o banco de dados whitelists já existe
      const queryResult = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${bd}';`);
      if (queryResult.rows.length === 0) {
        // O banco de dados não existe, então criá-lo
        await client.query(`CREATE DATABASE ${bd};`);
        console.log('Banco de dados criado com sucesso.');
      } else {
        console.log('Banco de dados já existe.');
      }
    } catch (error) {
      console.error('Erro ao criar banco de dados:', error);
    } finally {
      await client.end();
    }
  }
}

async function createTable(tabela: string, bd: string) {
  if (tabela) {
    const client = connectionCreate(bd);

    try {
      await client.connect();

      // Verificar se a tabela já existe
      const queryResult = await client.query(`SELECT EXISTS (
          SELECT 1
          FROM   information_schema.tables 
          WHERE  table_schema = '${bd}'
          AND    table_name = '${tabela}'
      );`);

      const tabelaExiste = queryResult.rows[0].exists;

      if (!tabelaExiste) {
        // A tabela não existe, então criá-la
        await client.query(`CREATE TABLE ${tabela} (
          id VARCHAR(255) PRIMARY KEY,
          slug VARCHAR(255),
          nome VARCHAR(255),
          endDate TIMESTAMP,
          blockchain VARCHAR(255),
          ogPrice VARCHAR(255),
          wlPrice VARCHAR(255),
          pubPrice VARCHAR(255),
          supply VARCHAR(255),
          qtdWinners VARCHAR(255),
          giveawayUrl VARCHAR(255),
          plataforma VARCHAR(255),
          needDiscordRole BOOLEAN,
          discordRole VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          isSelected BOOLEAN DEFAULT FALSE
        );`);
        console.log('Tabela criada com sucesso.');
      } else {
        console.log('Tabela já existe.');
      }
    } catch (error) {
      console.error('Erro ao criar tabela:', error);
    } finally {
      await client.end();
    }
  }
}

async function clearTable(tabela: string, bd: string) {
  if (tabela) {
    const client = connectionCreate(bd);

    try {
      await client.connect();

      await client.query(`TRUNCATE ${tabela};`);

      console.log('Feito limpeza da tabela.');
    } catch (error) {
      console.error('Erro ao limpar tabela:', error);
    } finally {
      await client.end();
    }
  }
}

async function inserirDadosBd(tabela: string, dados: WhitelistAlphabot[], bd: string) {
  const client = connectionCreate(bd);

  try {
    console.log('Conectando ao banco.');
    console.log('Iniciando inserção dos dados...');
    await client.connect();

    // Inicia a transação
    await client.query('BEGIN');

    // Array para armazenar os IDs dos registros inseridos com sucesso
    const idsInseridos: string[] = [];

    dados.forEach(async (dado: WhitelistAlphabot) => {
      const consulta = `INSERT INTO ${tabela} (
        id,
        slug,
        nome,
        endDate,
        blockchain,
        ogPrice,
        wlPrice,
        pubPrice,
        supply,
        qtdWinners,
        giveawayUrl,
        plataforma,
        needDiscordRole,
        discordRole
        )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
      ON CONFLICT (id) DO UPDATE
      SET 
        slug = EXCLUDED.slug,
        nome = EXCLUDED.nome,
        endDate = EXCLUDED.endDate,
        blockchain = EXCLUDED.blockchain,
        ogPrice = EXCLUDED.ogPrice,
        wlPrice = EXCLUDED.wlPrice,
        pubPrice = EXCLUDED.pubPrice,
        supply = EXCLUDED.supply,
        qtdWinners = EXCLUDED.qtdWinners,
        giveawayUrl = EXCLUDED.giveawayUrl,
        plataforma = EXCLUDED.plataforma,
        needDiscordRole = EXCLUDED.needDiscordRole,
        discordRole = EXCLUDED.discordRole
      RETURNING id;`;

      const valores = [
        dado.id,
        dado.slug,
        dado.nome,
        dado.endDate,
        dado.blockchain,
        dado.ogPrice,
        dado.wlPrice,
        dado.pubPrice,
        dado.supply,
        dado.qtdVencedores,
        dado.urlCompleta,
        dado.plataforma,
        dado.precisaDiscordRole,
        dado.discordRole
      ];
      // Verificar se a tabela já existe
      const resultado = await client.query(consulta, valores);

      // Adiciona o ID do registro inserido com sucesso ao array
      idsInseridos.push(resultado.rows[0].id);
    });

    console.log('Dados adicionados com sucesso.');

    // Finaliza a transação
    await client.query('COMMIT');
  } catch (error) {
    // Em caso de erro, desfaz a transação
    await client.query('ROLLBACK');
    console.error('Erro ao Adicionar Dados na tabela:', error);
  } finally {
    await client.end();
  }
}

async function lerDadosBd(tabela: string) {
  const client = new Client({
    user: 'postgres',
    password: '#Amora@157#',
    host: 'localhost',
    database: 'whitelists',
    port: 5432
  });

  try {
    await client.connect();

    // Verificar se a tabela já existe
    const queryResult = await client.query(`SELECT * FROM ${tabela};`);

    // console.log('queryResult ===> ', queryResult.rows);

    return queryResult.rows;
  } catch (error) {
    console.error('Erro ao recuperar dados:', error);
  } finally {
    await client.end();
  }
}

function configurarTimeout(req: Request, res: Response, next: NextFunction) {
  const rota = req.path.substring(1);

  //FIXME: Colocado fixo devido a apontamento do fortify
  const timeout = 120000;

  res.setTimeout(timeout, () => {
    const respostaBff = Respostas.sistemaIndisponivel(99);
    gravarLog(rota, req.body, respostaBff);
    res.status(respostaBff.status).json(respostaBff.corpo);
  });
  next();
}

export { clearTable, configurarTimeout, createDB, createTable, inserirDadosBd, lerDadosBd };
