import {custom} from '$config/loopbackConifg.json';
import ResultService, {
  JsonWebTokenError,
  UnauthorizedError,
} from '$services/plugins/result.service';
import TokenService from '$services/plugins/token.service';
import {Middleware, Request} from '@loopback/rest';

function getApiFlag(request: Request) {
  let urlMatch = request.url.match(/(^\/\w+)(?:\W+)/);
  return urlMatch && urlMatch[1] === custom.apiBasePath;
}

export const resultMiddleware: Middleware = async (ctx, next) => {
  const {request} = ctx;
  try {
    let apiFlag = getApiFlag(request);
    const result = await next();
    if (apiFlag) {
      return ResultService.getSuccessResult(result);
    }
    return result;
  } catch (error) {
    delete error.stack;
    console.error(
      'resultMiddleware error, url: %s, error: %s',
      request.originalUrl,
      error,
    );
    // return的话都是200状态码 但是data会有相应的状态码信息 也可以用throw
    return ResultService.getErrorResult(error);
  }
};

export const authMiddleware: Middleware = async (ctx, next) => {
  const {request} = ctx;
  try {
    let apiFlag = getApiFlag(request);
    let authorization = ctx.request.headers.authorization;
    if (apiFlag) {
      if (!authorization)
        throw new UnauthorizedError(
          'Authorization not found in request header!',
        );
      let startPoint = authorization.slice(0, 7);
      authorization =
        startPoint === 'Bearer ' ? authorization.slice(7) : authorization;
      const jwtToken = authorization || null;
      if (!jwtToken)
        throw new UnauthorizedError(
          'Authorization not found in request header!',
        );
      try {
        TokenService.verify(jwtToken);
      } catch (error) {
        throw new JsonWebTokenError(error.message);
      }
    }
    return await next();
  } catch (error) {
    delete error.stack;
    console.log(
      'authMiddleware error, url: %s, error: %s',
      request.originalUrl,
      error,
    );
    // return的话都是200状态码 但是data会有相应的状态码信息 也可以用throw
    return ResultService.getErrorResult(error);
  }
};
