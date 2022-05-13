import { fileURLToPath } from 'node:url'
import {describe, expect, it} from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils'

await setup({
    rootDir: fileURLToPath(new URL('..', import.meta.url)),
    server: true,
})

describe('Index', async () => {


})
