import { randomUUID } from 'node:crypto'
import { afterAll, describe, expect, it, vi } from 'vitest'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { exportUrlsReport } from './export-urls-report'
import { createShortUrl } from './create-short-url'

afterAll(async () => {
  await db.delete(schema.urls)
})

describe('export urls report', () => {
  it('should be able to export urls report', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'https://example.com/file.csv',
        }
      })

    const url1Response = await createShortUrl({ fullUrl: 'https://example.com/', slug: randomUUID() })
    const url2Response = await createShortUrl({ fullUrl: 'https://example.com', slug: randomUUID() })
    const url3Response = await createShortUrl({ fullUrl: 'https://example.com', slug: randomUUID() })
    const url4Response = await createShortUrl({ fullUrl: 'https://example.com', slug: randomUUID() })
    const url5Response = await createShortUrl({ fullUrl: 'https://example.com', slug: randomUUID() })

    if (isLeft(url1Response) || isLeft(url2Response) || isLeft(url3Response) || isLeft(url4Response) || isLeft(url5Response)) {
      return;
    }

    const url1 = unwrapEither(url1Response)
    const url2 = unwrapEither(url2Response)
    const url3 = unwrapEither(url3Response)
    const url4 = unwrapEither(url4Response)
    const url5 = unwrapEither(url5Response)

    const sut = await exportUrlsReport();

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream

    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual({
      reportUrl: 'https://example.com/file.csv',
    })

    expect(csvAsArray).toEqual([
      ['ID', 'Original Url', 'Short Url', 'Access Count', 'Created At'],
      [
        url1.id,
        url1.fullUrl,
        url1.shortUrl,
        String(url1.entries),
        expect.any(String),
      ],
      [
        url2.id,
        url2.fullUrl,
        url2.shortUrl,
        String(url2.entries),
        expect.any(String),
      ],
      [
        url3.id,
        url3.fullUrl,
        url3.shortUrl,
        String(url3.entries),
        expect.any(String),
      ],
      [
        url4.id,
        url4.fullUrl,
        url4.shortUrl,
        String(url4.entries),
        expect.any(String),
      ],
      [
        url5.id,
        url5.fullUrl,
        url5.shortUrl,
        String(url5.entries),
        expect.any(String),
      ]
    ])
  })
})
