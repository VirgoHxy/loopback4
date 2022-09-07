import {ControllerRoute, DefaultSequence, Request, RequestContext} from '@loopback/rest';
import {settingConfig} from './config';
import JWTPlugin, {TokenConstant} from './plugins/jwt.plugin';
import {ResultPlugin, UnauthorizedError} from './plugins/loopback-result.plugin';

export class MySequence extends DefaultSequence {
  auth(request: Request): boolean {
    let authorization = request.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedError('Authorization not found in request header!');
    }
    const startPoint = authorization.slice(0, 7);
    authorization = startPoint === 'Bearer ' ? authorization.slice(7) : authorization;
    const jwtToken = authorization || null;
    if (!jwtToken) {
      throw new UnauthorizedError('Authorization not found in request header!');
    }

    try {
      const tokenConstant: TokenConstant = {
        SECRET_KEY: settingConfig.jwt.secret,
        EXPIRATION: settingConfig.jwt.expiresIn,
        ALGORITHM: 'HS256',
      };
      new JWTPlugin(tokenConstant).verify(jwtToken);
      return true;
    } catch (error) {
      return false;
    }
  }

  async handle(context: RequestContext) {
    try {
      // Invoke registered Express middleware
      const finished = await this.invokeMiddleware(context);
      if (finished) {
        // The response been produced by the middleware chain
        return;
      }
      // 对业务控制器进行token校验以及response返回
      let isOper = false;
      // findRoute() produces an element
      const route = this.findRoute(context.request);
      if (route instanceof ControllerRoute) {
        const controllerName = Object.getPrototypeOf(route)._controllerName;
        const methodName = Object.getPrototypeOf(route)._methodName;
        const notOperControllers = ['ExplorerController', 'PingController'];
        const notOperMethods: string[] = [];
        if (!notOperControllers.includes(controllerName) && !notOperMethods.includes(methodName)) {
          isOper = true;
        }
      }
      if (isOper) {
        const isAuth = this.auth(context.request);
        if (!isAuth) {
          throw new UnauthorizedError('Authorization is illegal!');
        }
      }
      // parseParams() uses the route element and produces the params element
      const params = await this.parseParams(context.request, route);
      // invoke() uses both the route and params elements to produce the result (OperationRetVal) element
      let result = await this.invoke(route, params);
      if (isOper) {
        result = ResultPlugin.getSuccessResult(result);
      }
      // send() uses the result element
      this.send(context.response, result);
    } catch (error) {
      this.reject(context, error);
    }
  }
}
