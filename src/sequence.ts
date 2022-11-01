import {ControllerRoute, DefaultSequence, Request, RequestContext} from '@loopback/rest';
import jwt from 'jsonwebtoken';
import {settingConfig} from './config';
import {JWTPlugin, SuccessResult, TokenConstant, UnauthorizedError} from './plugins';

const tokenConstant: TokenConstant = {
  SECRET_KEY: settingConfig.jwt.secret,
  EXPIRATION: settingConfig.jwt.expiresIn,
  ALGORITHM: settingConfig.jwt.algorithm as jwt.Algorithm,
};
const jwtPlugin = new JWTPlugin(tokenConstant);

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
      jwtPlugin.verify(jwtToken);
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
        result = new SuccessResult(result);
      }
      // send() uses the result element
      this.send(context.response, result);
    } catch (error) {
      // 如果send会返回200
      // this.send(context.response, ResultPlugin.getErrorResult(error));
      // reject会返回对应的状态码
      this.reject(context, error);
    }
  }
}
