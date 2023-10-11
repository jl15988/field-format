const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: {
            // 修改项目入口文件
            entry: 'examples/main.ts',
            template: 'public/index.html',
            filename: 'index.html'
        }
    },
    // css不分离
    css: {extract: false}
})
