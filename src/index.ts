import {ApplicationConfig, Loopback4Application} from './application';
import {loopbackConfig} from './config';
import {JWTPlugin, logger} from './plugins';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  const app = new Loopback4Application(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  logger.info(
    new JWTPlugin({
      SECRET_KEY: 'your-256-bit-secret',
      EXPIRATION: 24 * 60 * 60,
      ALGORITHM: 'HS256',
    }).sign({name: 'hxy'}),
  );
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
      loopbackConfig.rest,
    ),
  };
  main(config).catch(err => {
    logger.error('Cannot start the application.', err);
    process.exit(1);
  });
}
