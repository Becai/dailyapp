module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://v.juhe.cn/toutiao',
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
};