// tslint:disable:no-console
// tslint:disable:no-import-side-effect
import 'source-map-support/register';

import { createServer, ITractorServer } from '@cashfarm/tractor';
import { IEventStore, EventBus, RabbitMQTransport, IEventBus } from '@cashfarm/plow';
import { eventStore } from './db';

import { PlowConfig } from '@cashfarm/plow';

PlowConfig.appPackageName = '@cashfarm/examples-todo-api';

export const ServiceName = 'TodoService';

export const server = createServer(
  // Service name
  ServiceName,
  // Options
  {
    apiPrefix: '/todos/v1',
    port: 8000
  }
)
.then(srv => {
  // If your are using @Controller decorator, just require your controllers
  require('./todoCtrl');

  const container = srv.getContainer();

  container.bind(IEventStore).toConstantValue(eventStore);
  container.bind(IEventBus).toConstantValue(new EventBus('todos', new RabbitMQTransport()));

  // if running directly, start the server
  if (!module.parent) {
    srv.start(() => {
      console.log(`✅ Started ${ServiceName} microservice on ${srv.info.uri}`);
    });
  }

  // if importing, return the server (used for testing)
  return srv;
});
