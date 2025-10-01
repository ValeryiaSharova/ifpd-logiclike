import { FastifyRequest } from 'fastify';

export const getClientIp = (request: FastifyRequest): string => {
  const xForwardedFor = request.headers['x-forwarded-for'];

  if (xForwardedFor) {
    const headerValue = Array.isArray(xForwardedFor)
      ? xForwardedFor[0]
      : xForwardedFor;

    const ips = headerValue.split(',').map((ip: string) => ip.trim());

    return ips[0];
  }

  const xRealIp = request.headers['x-real-ip'];

  if (xRealIp) {
    const headerValue = Array.isArray(xRealIp) ? xRealIp[0] : xRealIp;

    return headerValue.trim();
  }

  if (request.ip) {
    return request.ip;
  }

  return request.socket?.remoteAddress || 'unknown';
};
