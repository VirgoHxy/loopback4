import {ApplicationConfig, Loopback4Application} from './application';
import {rest} from './config/loopback.conifg.json';
import {logger} from './plugins';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new Loopback4Application(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  logger.info(`Try ${url}/ping`, new Error('123'));
  logger.info(`Try ${url}/ping`, {demo: 1});
  logger.info(`Server is running at ${url}`);
  logger.info(`Try ${url}/ping`);

  return app;
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: Object.assign(
      {
        port: +(process.env.PORT ?? 3000),
        host: process.env.HOST,
        // The `gracePeriodForClose` provides a graceful close for http/https
        // servers with keep-alive clients. The default value is `Infinity`
        // (don't force-close). If you want to immediately destroy all sockets
        // upon stop, set its value to `0`.
        // See https://www.npmjs.com/package/stoppable
        gracePeriodForClose: 5000, // 5 seconds
        openApiSpec: {
          // useful when used with OpenAPI-to-GraphQL to locate your application
          setServersFromRequest: true,
        },
      },
      rest,
    ),
  };
  main(config).catch(err => {
    logger.error('Cannot start the application.', err);
    process.exit(1);
  });
}