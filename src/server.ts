// tslint:disable:no-console
// tslint:disable:no-import-side-effect
import 'source-map-support/register';

import { Server } from 'hapi';

import { container } from '@cashfarm/plow';
import { createServer, listContainerBindings, Controllers } from '@cashfarm/tractor';

const ServiceName = 'orgs';

const server = createServer(
  ServiceName,
  {
    apiPrefix: '/todos/v1',
    port: 8000,
    debug: true,
    enableCors: true
  }
)
.then(srv => {
  require('./todoCtrl');

  console.log('hehe', container.getAll(Controllers));

  if (!module.parent) {
    console.log(`Container (${container.guid}) bindings so far`);
    listContainerBindings(container).map( (b: string, i: number) => console.log(i, b));

    srv.start(() => {
      console.log(`✅ Started ${ServiceName} microservice on ${srv.info.uri}`);
    });
  }

  // const container = srv.getContainer();

//  configureContainer(container);

  const router = srv.getRouter();

  // const controllers = ;

  // const ctrlArr = Reflect.ownKeys(controllers)
  //         .filter(k => typeof controllers[k] === 'function' )
  //         .map(k => controllers[k]);

  // router.addControllers([require('./todoCtrl').TodoController]);

  // console.log('ROUTER', router);

  return srv;
});

// export default server;
