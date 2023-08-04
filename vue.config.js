const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports={
  devServer:{
    port:8080,
    open:true,
    proxy:'http://localhost:8081'
  }
}