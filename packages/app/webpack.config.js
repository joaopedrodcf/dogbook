/* eslint-disable @typescript-eslint/no-var-requires */
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const clientPort = 8080;

module.exports = (env, argv) => {
    const isDevelopment = argv.mode !== 'production';

    return {
        target: 'web',
        entry: {
            main: require.resolve('./src/client.tsx'),
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'index.js',
            publicPath: isDevelopment ? '/' : '/dist', // when yarn start we need the files in / but when yarn start:server we need them on dist folder
            clean: true,
        },
        devServer: {
            port: clientPort,
            historyApiFallback: true, // prevent react-router from falling trying to get the route on refresh
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    loader: 'source-map-loader',
                    exclude: /node_modules/, // prevent error: failed to parse source map
                },
                {
                    test: /\.tsx?$/,
                    use: [
                        isDevelopment && {
                            loader: 'babel-loader',
                            options: { plugins: ['react-refresh/babel'] },
                        },
                        {
                            loader: 'ts-loader',
                            options: {
                                projectReferences: true, // webpack creating typescript project references
                                configFile: require.resolve('./tsconfig.json'),
                            },
                        },
                    ].filter(Boolean),
                    exclude: /node_modules/,
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    loader: 'file-loader',
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: require.resolve('./src/public/index.html'),
            }),
            new MiniCssExtractPlugin(),
            isDevelopment && new ReactRefreshPlugin(),
            isDevelopment && new BundleAnalyzerPlugin(),
        ].filter(Boolean),
    };
};
