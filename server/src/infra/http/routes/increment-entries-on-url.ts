import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { incrementEntriesOnUrl } from '@/app/functions/increment-entries-on-url'

export const incrementEntriesOnUrlRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/urls/:shortUrl/increment',
    {
      schema: {
        summary: 'Increment entries on url',
        tags: ['urls'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      await incrementEntriesOnUrl({ shortUrl })

      return reply.status(200).send()
    }
  )
}
