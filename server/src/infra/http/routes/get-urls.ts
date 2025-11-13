import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getUrls } from '@/app/functions/get-urls'
import { unwrapEither } from '@/shared/either'

export const getUrlsRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/urls',
    {
      schema: {
        summary: 'Get Urls',
        tags: ['urls'],
        response: {
          200: z.array(z.object({
            id: z.string(),
            shortUrl: z.string(),
            fullUrl: z.string(),
            entries: z.number(),
            createdAt: z.date(),
          })),
        },
      },
    },
    async (_, reply) => {
      const result = await getUrls()

      const { urls } = unwrapEither(result)

      return reply.status(200).send([...urls])
    }
  )
}
