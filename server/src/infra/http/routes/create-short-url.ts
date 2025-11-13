import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createShortUrl } from '@/app/functions/create-short-url'
import { isLeft } from '@/shared/either'

export const createShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/urls',
    {
      schema: {
        summary: 'Create short url',
        tags: ['urls'],
        body: z.object({
          fullUrl: z.string(),
          slug: z.string()
        }),
        response: {
          201: z.null(),
          400: z.object({
            message: z.string(),
            field: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { fullUrl, slug } = request.body

      const result = await createShortUrl({ fullUrl, slug })

      if (isLeft(result)) {
        const error = result.left
        return reply.status(error.statusCode ?? 400).send({
          message: error.message,
          field: error.field,
        })
      }

      return reply.status(201).send()
    }
  )
}
