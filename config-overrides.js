const {
    override, fixBabelImports, addLessLoader, useEslintRc,
    addBabelPlugins
} = require('customize-cra');
const {configDllPlugin} = require('./config/config-dll-plugin')
const {configPublicPath} = require('./config/config-public-path')

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#009688',
            '@link-color': '#1890ff', // 链接色
            '@success-color': '#52c41a', // 成功色
            '@warning-color': '#faad14', // 警告色
            '@error-color': '#f5222d', // 错误色
            '@font-size-base': '14px', // 主字号
            '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
            '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
            '@text-color-secondary': 'rgba(0, 0, 0, .45)', // 次文本色
            '@disabled-color ': 'rgba(0, 0, 0, .25)', // 失效色
            '@border-radius-base': '4px', // 组件/浮层圆角
            '@border-color-base': '#d9d9d9', // 边框色
            '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // 浮层阴影
        },
    }),
    useEslintRc(),
    configPublicPath(),
    configDllPlugin(),
    addBabelPlugins(
        //转换组件懒加载import语法
        "@babel/plugin-syntax-dynamic-import",
        //转换装饰器[@log]的插件一定要在class插件的上面
        ["@babel/plugin-proposal-decorators", {"legacy": true}],
        //转换class的插件
        ['@babel/plugin-proposal-class-properties', {"loose": true}],
        "@babel/plugin-transform-runtime",
    ),
)