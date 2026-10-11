import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  projectName: 'next-episode',
  date: '2026-09-09',
  designWidth: 375,
  deviceRatio: { 375: 2 },
  sourceRoot: 'src',
  // Keep browser preview and WeChat output isolated. A failed H5 build must
  // never erase the mini-program files consumed by WeChat DevTools.
  outputRoot: process.env.TARO_ENV === 'h5' ? 'preview-h5' : 'dist',
  framework: 'react',
  compiler: 'webpack5',
  cache: { enable: false },
  mini: { postcss: { pxtransform: { enable: true }, cssModules: { enable: false } } },
  h5: {
    publicPath: process.env.H5_BASE_PATH || './',
    staticDirectory: 'static',
    htmlPluginOption: { template: 'src/index.html' },
    postcss: { autoprefixer: { enable: true } }
  }
})
