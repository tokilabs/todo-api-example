import * as fs from 'fs';
import * as path from 'path';
import { createPool, Pool, PoolConfig } from 'mysql';

import { IEventStore, GesEventStore } from '@cashfarm/plow';

const debug = require('debug')('todos');

if (fs.existsSync(path.join(__dirname, '..', '.env')))
  require('env2')(path.join(__dirname, '..', '.env'));

const connInfo: PoolConfig = {
  database : process.env.TODOS_DB_NAME || 'todos',
  host     : process.env.TODOS_DB_HOST || 'localhost',
  user     : process.env.TODOS_DB_USER || 'root',
  password : process.env.TODOS_DB_PASS || '',
  port     : parseInt(process.env.TODOS_DB_PORT) || 3306
};

debug('Database connection info', connInfo);

export const ConnectionPool: Pool = createPool(connInfo);

export const eventStore = new GesEventStore(process.env.TODOS_ES_HOST || 'localhost', parseInt(process.env.TODOS_ES_PORT) || 1113);
