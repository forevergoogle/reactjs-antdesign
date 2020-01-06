const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devServer = {
    port: 8080,
    open: true,
    historyApiFallback: true
}

const VENDOR_LIBS = [
    "axios", "antd", "jquery", "jquery-slimscroll","jquery-sparkline", "jquery-knob",
    "react", "react-dom", "less", "rimraf", 
    "react-redux", "react-router-dom", "redux", "redux-form", "redux-thunk",
    "lodash", "moment", "xlsx", "react-number-format",
    "raphael", "fastclick",
];

const configPro = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: '[name].[chunkhash].js',
        publicPath: 'http://staging.portal-ecbs.itlvn.com/',
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
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: 'http://staging.portal-ecbs.itlvn.com/public'
                },
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
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            tether: 'tether',
            Tether: 'tether',
            'window.Tether': 'tether',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },
            }
        },
        runtimeChunk: true,
        minimize: true
    },
    devServer,
    mode: 'production'

}

module.exports = configPro;