import {CustomLogger, TransportEnum} from './logger.plugin';

export * from './jwt.plugin';
export * from './logger.plugin';
export * from './loopback-result.plugin';
export const logger = new CustomLogger({transportType: TransportEnum.category}).winstonLogger;
