import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm'],
	outDir: 'dist',
	target: 'node18',
	clean: true,
	splitting: false,
	sourcemap: true,
	dts: true,
	minify: false,
	skipNodeModulesBundle: true,
	shims: true,
})
