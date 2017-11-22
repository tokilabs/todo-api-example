import { createPool, Pool, PoolConfig } from 'mysql';

const debug = require('debug')('todos');

const connInfo: PoolConfig = {
  database : process.env.TODOS_DB_NAME || 'todos',
  host     : process.env.TODOS_DB_HOST || 'localhost',
  user     : process.env.TODOS_DB_USER || 'root',
  password : process.env.TODOS_DB_PASS || '',
  port     : parseInt(process.env.TODOS_DB_PORT) || 3306
};

debug('Database connection info', connInfo);

export const ConnectionPool: Pool = createPool(connInfo);
