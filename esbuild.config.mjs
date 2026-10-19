import { rm } from 'node:fs/promises'
import esbuild from 'esbuild'
import copyPluginPkg from '@sprout2000/esbuild-copy-plugin'

const { copyPlugin } = copyPluginPkg

const options = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outdir: 'lib',
    minify: true,
    platform: 'node',
    packages: 'external',
    plugins: [
        copyPlugin({
            src: './src/assets',
            dest: './lib/assets',
        }),
    ],
}

await rm('./lib/assets', { recursive: true, force: true })
await esbuild.build(options)