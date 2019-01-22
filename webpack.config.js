// Necessary inclusions!
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Necessary declarations!
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

// This is the file that the app will look towards to render!
const entryPoint = {
    main: './main',
    vendor: [
        'react',
        'react-dom',
        'react-router',
        'react-router-dom',
        'styled-components',
        'redux',
        'react-redux'
    ]
};

// This is the information about webpack's output directory and path.
const outputObj = {
    path: path.join(__dirname, '/source/server/static'),
    filename: '[name].js',
    publicPath: './js/',
    chunkFilename: "[id].js"
};

const clientConfig = {
    context: path.join(__dirname, '/source/client'),
    devtool: 'source-map',
    entry: entryPoint,
    output: outputObj,
    module: {
        rules: [
            // Allows Babel to do its thing
            { 
                test: /\.tsx$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader'
            },
    
            // Essentially allows styling to work
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'}, 
                    {loader: 'css-loader'}
                ]
            },
    
            // Essentially allows png's/jp(e)g's to be loaded
            // Inline base64 for <8192, direct url for others
            {
                test: /\.png|jp(e*)g$/,
                use: [
                    {loader: 'url-loader?limit=8192'}
                ]
            }
        ]
    },
    resolve: {
        // This allows us to require('file') in place of require('file.js')
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.pug']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all",
              }
            }
          }
    },
    plugins: [
        new CleanWebpackPlugin(['public']),
        // new BundleAnalyzerPlugin()
    ]
}

// Setting Webpack's Configuration
module.exports = clientConfig;