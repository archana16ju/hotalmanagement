import { getPayload } from 'payload'
import config from '@/payload.config'
import { nextHandler } from '@payloadcms/next'

const payload = await getPayload({ config })

export const { GET, POST, DELETE, PATCH } = nextHandler({
  payload,
})