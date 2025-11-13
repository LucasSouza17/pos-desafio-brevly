import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { type Either, makeRight } from '@/shared/either'

type ExportUrlsOutput = {
  reportUrl: string
}

export async function exportUrlsReport(): Promise<Either<never, ExportUrlsOutput>> {
  const { sql, params } = db
    .select({
      id: schema.urls.id,
      fullUrl: schema.urls.fullUrl,
      shortUrl: schema.urls.shortUrl,
      entries: schema.urls.entries,
      createdAt: schema.urls.createdAt,
    })
    .from(schema.urls)
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(2)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'ID' },
      { key: 'full_url', header: 'Original Url' },
      { key: 'short_url', header: 'Short Url' },
      { key: 'entries', header: 'Access Count' },
      { key: 'created_at', header: 'Created At' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], _, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'reports',
    fileName: `${new Date().toISOString()}-uploads.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  await convertToCSVPipeline

  return makeRight({ reportUrl: url })
}
