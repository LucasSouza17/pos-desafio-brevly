import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { deleteUrl } from '@/app/functions/delete-url'

export const deleteUrlRoute: FastifyPluginAsyncZod = async server => {
  server.delete(
    '/urls/:shortUrl',
    {
      schema: {
        summary: 'Delete a url',
        tags: ['urls'],
        params: z.object({
          shortUrl: z.string(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { shortUrl } = request.params

      await deleteUrl({ shortUrl })

      return reply.status(204).send()
    }
  )
}
