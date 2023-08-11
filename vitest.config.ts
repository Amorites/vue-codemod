import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/testUtils.ts',
            '**/cypress/**',
            '**/.{idea,git,cache,output,temp}/**',
            '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*'
        ]
    },
    esbuild: {
        format: 'esm'
    }
})