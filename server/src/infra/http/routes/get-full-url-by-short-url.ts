import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getFullUrlByShortUrl } from '@/app/functions/get-full-url-by-short-url'
import { unwrapEither } from '@/shared/either'

export const getFullUrlByShortUrlRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/urls/:shortUrl',
    {
      schema: {
        summary: 'Get full url by short url',
        tags: ['urls'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.object({
            fullUrl: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await getFullUrlByShortUrl({ shortUrl })

      const { fullUrl } = unwrapEither(result)

      return reply.status(200).send({ fullUrl })
    }
  )
}
