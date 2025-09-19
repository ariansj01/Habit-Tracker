import { FastifyPluginCallback } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: { id: string };
  }
}

const devAuthPlugin: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.addHook('preHandler', async (req) => {
    const userId = req.headers['x-user-id'];
    if (typeof userId === 'string' && userId.length > 0) {
      req.user = { id: userId };
    }
  });
  done();
};

export default devAuthPlugin;


