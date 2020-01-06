const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const devServer = {
    port: 8080,
    open: true,
    historyApiFallback: true
}

const configDev = {
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: 'http://localhost:8080/',
        filename: 'bundle.js'
    },
    node: { fs: 'empty' },
    performance: { hints: false },
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                use: 'babel-loader',
                exclude: /node_modules(?!\/antd)/
            },
            {
                test: /\.css$|\.map$|\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader", options: { javascriptEnabled: true }  }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    })
            },
            {
                test: /\.(ttf|eot|svg|gif|jpeg|woff|woff2|wav|mp3|ico|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: 'style.css' }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
    ],
    devServer,
    mode: 'development'
}

module.exports = configDev;
    