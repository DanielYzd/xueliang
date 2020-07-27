// vue.config.js
'use strict' //使用严格模式
const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV) //判断是否是生产环境
console.log(process.env.NODE_ENV)
module.exports = {
  /**
   * 默认值为'/' 是假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/
   * 如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
   * 设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径
   * 请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath
   */
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  /**
   * 默认值index.html 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
   */
  indexPath: 'index.html',

  /**
   *  默认值'dist', 生产环境构建文件的目录当运行 vue-cli-service
   *  当运行 yarn build 时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
   */
  outputDir: process.env.outputDir || 'dist',

  /**
   *  默认值'' 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
   */
  assetsDir: 'static',

  /**
   * 默认值'default'
   * 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
   * yarn add @vue/cli-plugin-eslint --dev --save
   * 设置为 true 或 'warning' 时，eslint-loader 会将 lint 错误输出为编译警告。默认情况下，警告仅仅会被输出到命令行，且不会使得编译失败。
   * 如果你希望让 lint 错误在开发时直接显示在浏览器中，你可以使用 lintOnSave: 'default'。
   * 这会强制 eslint-loader 将 lint 错误输出为编译错误，同时也意味着 lint 错误将会导致编译失败。
   * overlay 同时显示警告和错误
   * module.exports = {
        devServer: {
          overlay: {
            warnings: true,
            errors: true
          }
        }
      }
   */

  lintOnSave: process.env.NODE_ENV === 'development',

  /**
   * 默认值false
   * 是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了
   * 但是这会让你的应用额外增加 10kb 左右。
   */
  runtimeCompiler: true,

  /**
   * 默认值true
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
   */
  productionSourceMap: !IS_PROD,

  /**
   * 默认值require('os').cpus().length > 1
   * 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建
   */
  parallel: require('os').cpus().length > 1,

  /**
   * 向 PWA 插件传递选项
   */
  pwa: {},

  /**
   * 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
   * 配合webpack > 链式操作
   */
  chainWebpack: config => {
    config.resolve.symlinks(true) // 修复热更新失效
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin('html').tap(args => {
      // 修复 Lazy loading routes Error
      args[0].chunksSortMode = 'none'
      return args
    })
    config.resolve.alias // 添加别名
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@components', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@store', resolve('src/store'))
    // 压缩图片
    // 需要 npm i -D image-webpack-loader
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: [0.65, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })
    // 打包分析, 打包之后自动生成一个名叫report.html文件(可忽视)
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
  },
  /**
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
     如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = []
    if (IS_PROD) {
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  css: {
    /**
     * 是否使用css分离插件
     */
    extract: !IS_PROD,
    /**
     *  去掉文件名中的 .module  此项设置为false会影响antd样式
     */
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        /**
         * cli4 需要多嵌套一层lessOptions,否则编译报错
         */
        lessOptions: {
          modifyVars: {
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
        /**
         * `globalVars` 定义全局对象，可加入全局变量
         */
        // globalVars: {
        //   primary: '#666'
        // }
      }
    }
  },
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    host: 'localhost',
    port: 8888, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
    proxy: {
      //配置多个跨域
      '/api': {
        target: 'http://172.11.11.11:7071',
        changeOrigin: true,
        // ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/api2': {
        target: 'http:/ /172.12.12.12:2018',
        changeOrigin: true,
        //ws: true,//websocket支持
        secure: false,
        pathRewrite: {
          '^/api2': '/'
        }
      }
    }
  }
}
