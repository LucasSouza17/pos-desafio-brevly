import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getFullUrlByShortUrl } from '@/app/functions/get-full-url-by-short-url'
import { isLeft, isRight, unwrapEither } from '@/shared/either'

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
          404: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      const result = await getFullUrlByShortUrl({ shortUrl })

      if (isLeft(result)) {
        const { type, message } = result.left

        if (type === 'NOT_FOUND') {
          return reply.status(404).send({ message })
        }
      }

      if (isRight(result)) {
        const { fullUrl } = result.right

        return reply.status(200).send({ fullUrl })
      }
    }
  )
}
