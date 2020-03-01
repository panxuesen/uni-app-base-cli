const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
    includes:['path','name','meta']
})
module.exports = {
    transpileDependencies: ['uni-simple-router'],
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}