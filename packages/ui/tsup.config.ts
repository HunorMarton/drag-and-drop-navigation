import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@workspace/ui',
    'react/jsx-runtime',
    'react/jsx-dev-runtime',
  ],
  noExternal: [],
  treeshake: true,
  platform: 'browser',
  target: 'es2020',
  esbuildOptions(options) {
    options.external = [
      ...(options.external || []),
      'react',
      'react-dom',
      '@workspace/ui',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
    ]
  },
})
