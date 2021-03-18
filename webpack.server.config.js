const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: {
        server: ('./src/server/server.js'),
    },
    output: {
        filename: './server/server.js'
    },
    target: "node",
    optimization: {
        minimizer: [
            new TerserPlugin({extractComments: false ,}),
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: './src/server/db',
                    to: './server/db',
                }
            ]
        }),
    ]
};