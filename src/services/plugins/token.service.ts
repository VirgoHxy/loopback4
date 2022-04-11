import jwt from 'jsonwebtoken';

interface TokenConstant {
  readonly SECRET_KEY: string;
  readonly EXPIRATION: number;
}

export default class TokenService {
  static tokenConstant: TokenConstant = {
    SECRET_KEY: 'your-256-bit-secret',
    EXPIRATION: 24 * 60 * 60,
  };

  static sign(name: string) {
    const now = new Date().getTime();
    const payload = {
      name,
      createAt: now,
      expireAt: now + this.tokenConstant.EXPIRATION * 1000,
    };
    const option: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: this.tokenConstant.EXPIRATION,
    };
    const token = jwt.sign(payload, this.tokenConstant.SECRET_KEY, option);
    return token;
  }

  static verify(token: string) {
    return jwt.verify(token, this.tokenConstant.SECRET_KEY);
  }

  constructor() {}
}
