import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { exportUrlsReport } from '@/app/functions/export-urls-report'
import { unwrapEither } from '@/shared/either'

export const exportUrlsReportRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/urls/report',
    {
      schema: {
        summary: 'Export urls report',
        tags: ['urls'],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (_, reply) => {
      const result = await exportUrlsReport()

      const { reportUrl } = unwrapEither(result)

      return reply.status(200).send({ reportUrl })
    }
  )
}
