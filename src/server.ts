// tslint:disable:no-console
// tslint:disable:no-import-side-effect
import 'source-map-support/register';

import { createServer, ITractorServer } from '@cashfarm/tractor';

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

  // if running directly, start the server
  if (!module.parent) {
    srv.start(() => {
      console.log(`✅ Started ${ServiceName} microservice on ${srv.info.uri}`);
    });
  }

  // if importing, return the server (used for testing)
  return srv;
});
