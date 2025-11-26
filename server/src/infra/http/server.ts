import { fastifyCors } from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '@/env'
import { createShortUrlRoute } from './routes/create-short-url'
import { deleteUrlRoute } from './routes/delete-url'
import { getFullUrlByShortUrlRoute } from './routes/get-full-url-by-short-url'
import { getUrlsRoute } from './routes/get-urls'
import { incrementEntriesOnUrlRoute } from './routes/increment-entries-on-url'
import { exportUrlsReportRoute } from './routes/export-urls-report'

const server = fastify()

// Configurações do servidor
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)
server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.validation })
  }

  console.error(error)
  return reply.status(500).send({ message: 'Internal server error' })
})

// Registra plugins
server.register(fastifyCors, { origin: '*', methods: ['GET', 'POST', 'DELETE'] })
server.register(fastifySwagger, {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Brevly Server API',
      version: '1.0.0',
    },
  },
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Registra rotas
server.register(createShortUrlRoute)
server.register(deleteUrlRoute)
server.register(getFullUrlByShortUrlRoute)
server.register(getUrlsRoute)
server.register(incrementEntriesOnUrlRoute)
server.register(exportUrlsReportRoute)

// Inicia o servidor
server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running on http://localhost:3333!')
})
