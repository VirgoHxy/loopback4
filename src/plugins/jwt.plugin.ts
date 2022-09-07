import jwt from 'jsonwebtoken';

export interface TokenConstant {
  readonly SECRET_KEY: string;
  readonly EXPIRATION: number;
  readonly ALGORITHM: jwt.Algorithm;
}

export class JWTPlugin {
  tokenConstant: TokenConstant;

  constructor(tokenConstant: TokenConstant) {
    this.tokenConstant = tokenConstant;
  }

  sign(param: object): string {
    const payload = param || {};
    const option: jwt.SignOptions = {
      expiresIn: this.tokenConstant.EXPIRATION,
      algorithm: this.tokenConstant.ALGORITHM,
    };
    return jwt.sign(payload, this.tokenConstant.SECRET_KEY, option);
  }

  verify(token: string): unknown {
    return jwt.verify(token, this.tokenConstant.SECRET_KEY);
  }
}

// console.log(
//   new JWTPlugin({
//     SECRET_KEY: 'your-256-bit-secret',
//     EXPIRATION: 24 * 60 * 60,
//     ALGORITHM: 'HS256',
//   }).sign({name: 'hxy'}),
// );
