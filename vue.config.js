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