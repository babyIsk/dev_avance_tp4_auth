import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";
import { readFileSync } from 'fs';

export default fp(async function (app, opts) {

    const privateKey = readFileSync('.ssl/ecdsa.pri', 'utf8');
    const publicKey = readFileSync('.ssl/ecdsa.pub', 'utf8');

    app.register(fastifyJwt, {
        secret: {
            private: privateKey,
            public: publicKey,
        },
        algorithms: ['ES256'],
        sign: {
            issuer: 'info.iutparis.fr',
        },
        verify: {
            issuer: 'info.iutparis.fr',
        },
    })

})