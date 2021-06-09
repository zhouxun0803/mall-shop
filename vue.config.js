module.exports = {
    publicPath:"/",
    devServer: {
        proxy: {
            "/api": {
                target: "http://admin.raz-kid.cn",
                changOrigin: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            }
        }
    }
}