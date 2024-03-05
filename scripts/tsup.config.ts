import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/unpack.ts'],
  clean: true,
  dts: true,
  outDir: 'dist',
  format: ['esm', 'cjs']
})
