/*
 *  修改 webpack 配置
 */

module.exports = {
    baseUrl: './',
    css: {
        loaderOptions: {
            sass: {
                loader: 'sass-loader',
                options: {
                    indentedSyntax: true
                }
            }
        }
    },
    devServer: {
        port: 8080, // 端口号
        host: require('my-local-ip')(),
        open: true, //配置自动启动浏览器
        proxy: {
            '/api': {
                target: 'http://172.16.10.228:3000/',
                changeOrigin: true
            }
        }, // 配置多个代理
    },
    pwa: {
        // configure the workbox plugin
        workboxPluginMode: 'GenerateSW',
        //https://developers.google.com/web/tools/workbox/modules/workbox-build#full_generatesw_config
        workboxOptions: {
            modulePathPrefix: './',
            importWorkboxFrom: 'local'
        }
    }
}