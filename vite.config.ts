import {literalsHtmlCssMinifier} from '@literals/rollup-plugin-html-css-minifier';
import {cssMinifier, devSsr} from 'dreamland/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [
    literalsHtmlCssMinifier(),
    cssMinifier({
      include: ['src/**/*.tsx'],
    }),

    devSsr({
      entry: '/src/main-server.ts',
    }),
  ],
  build: {sourcemap: 'hidden'}
});
