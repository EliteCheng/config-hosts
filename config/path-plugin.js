const HtmlWebpackPlugin = require('html-webpack-plugin')

class PathPlugin {

    _replaceUrl(urlStr, regPrefix) {
        let reg = new RegExp(`${regPrefix}="([a-z0-9A-Z./-|%]{3,})"`);
        return urlStr.replace(reg, (_1, url) => {
            url = url.replace(/%(.+)%\//, (_1, $1) => process.env[$1] || '')
            return `src="${url}"`;
        })
    }

    processScriptTagSrc(htmlStr) {
        const reg = /<script .*src="[a-z0-9A-Z./-|%]{3,}".*(><\/script>)|(\/>)$/g;
        let newHtml = htmlStr.replace(reg, (scriptTagStr) => {
            return this._replaceUrl(scriptTagStr, 'src');
        });
        return newHtml;
    }

    processLinkTagHref(htmlStr) {
        const reg = /<link .*href="[a-z0-9A-Z./-|%]{3,}".*>/g;
        let newHtml = htmlStr.replace(reg, (linkTagStr) => {
            if (linkTagStr.indexOf('rel="stylesheet"') !== -1) {
                linkTagStr = this._replaceUrl(linkTagStr, "href")
            }
            return linkTagStr;
        });
        return newHtml;
    }

    processImgTagSrc(htmlStr) {
        const reg = /<img .*src="[a-z0-9A-Z./-|%]{3,}".*>/g;
        let newHtml = htmlStr.replace(reg, (imgTagStr) => {
            return this._replaceUrl(imgTagStr, 'src');
        });
        return newHtml;
    }

    processIframeTagSrc(htmlStr) {
        const reg = /<iframe .*src="[a-z0-9A-Z./-|%]{3,}".*>/g;
        let newHtml = htmlStr.replace(reg, (iframeTagStr) => {
            return this._replaceUrl(iframeTagStr, 'src');
        });
        return newHtml;
    }

    apply(compiler) {
        //同步钩子
        compiler.hooks.compilation.tap('JsPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).afterTemplateExecution.tap
            ('JsPlugin', (data) => {
                let {html} = data;
                html = this.processLinkTagHref(html);
                html = this.processScriptTagSrc(html);
                html = this.processImgTagSrc(html);
                html = this.processIframeTagSrc(html);
                data.html = html;
            })
        })
    }
}

module.exports = PathPlugin