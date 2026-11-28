import { readFileSync, readdirSync } from 'node:fs';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [{
    name: 'pdfjs-reader-assets',
    apply: 'build',
    generateBundle() {
      for (const directory of ['cmaps', 'standard_fonts', 'wasm', 'iccs']) {
        const source = new URL(`./node_modules/pdfjs-dist/${directory}/`, import.meta.url);
        for (const name of readdirSync(source)) {
          this.emitFile({
            type: 'asset',
            fileName: `pdfjs/${directory}/${name}`,
            source: readFileSync(new URL(name, source))
          });
        }
      }
    }
  }]
});
