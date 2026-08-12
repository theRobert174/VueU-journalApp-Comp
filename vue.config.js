const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    allowedHosts: 'all',
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    proxy: {
      'firebase-api/': {
        target: 'https://identitytoolkit.googleapis.com',
        changeOrigin: true,
        pathRewrite: {'^/firebase-api': ''}
      }
    }
  }
})
