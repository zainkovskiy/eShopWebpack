const HtmlWwebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/public/index.js",
    },
    output: {
        path: path.join(__dirname, 'dist/public'),
        publicPath: "/",
        filename: "js/script.js"
    },
    devtool: "source-map",
    target: "web",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({sourceMap: true,}),
            new CssMinimizerPlugin(),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    { loader: "css-loader", options: { sourceMap: true } },
                ],
            },
        ]
    },
    plugins: [
        new HtmlWwebpackPlugin(
            {
            template: "src/public/index.html",
            filename: "index.html",
                minify: false
            }
        ),
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: './src/public/img',
                    to: './img',
                }
            ]
        }),
    ]
}
