const isDev = process.env.NODE_ENV === 'development'
const configDllPlugin = () => {
    return webpackConfig => {
        //配置devtool 的source-map选项
        // webpackConfig.devtool = 'cheap-module-eval-source-map'
        webpackConfig.devtool = isDev ? 'cheap-module-source-map' : null
        if (!isDev) {
            webpackConfig['optimization'].splitChunks = {
                chunks: 'all',
                name: true,
                minSize: 30000,//单位byte
                minChunks: 1,//表示当代码被用了1次的时候就进行代码分割
                maxAsyncRequests: 10,
                maxInitialRequests: 5,
                automaticNameDelimiter: '.',
                cacheGroups: {
                    react: {
                        name: 'react',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|redux|prop-types|react-redux)[\\/]/,
                        priority: -1,
                    },
                    antd: {
                        name: 'antd',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](@ant-design|antd|react-json-view)[\\/]/,
                        priority: -2,
                    },
                    echarts: {
                        name: 'echarts',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](echarts)/,
                        priority: -3
                    },
                    vendors: {
                        name: 'vendors',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](lodash|lodash-decorators|moment|jquery|simple-pinyin|url-join|parseurl|axios|cross-fetch)[\\/]/,
                        priority: -4,
                    },
                    default: {
                        minChunks: 1,
                        reuseExistingChunk: true,
                        priority: -5,
                    }
                }
            }
        }
        return webpackConfig
    }
}

module.exports = {
    configDllPlugin,
}
