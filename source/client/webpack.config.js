// Necessary inclusions!
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Create Bundling Regex (for Chunk Splitting).
const bundleRegex = new RegExp(['[\\/]',
                            'react|',
                            'react-dom|',
                            'react-router|',
                            'react-router-dom|',
                            'react-soundplayer|',
                            'styled-components|',
                            'redux|',
                            'react-redux|',
                            'redux-thunk|',
                            'joi-browser|',
                            'rc-slider|',
                            'pizzicato|',
                            'inline-worker|',
                            'md5|',
                            'minio',
                            '[\\/]'].join(''));

// This is the file that the app will look towards to render!
const entryPoint = {
    main: './main'
};

// This is the information about webpack's output directory and path.
const outputObj = {
    path: path.join(__dirname, '../static'),
    filename: '[name].js'
};

const clientConfig = {
    context: path.join(__dirname, './'),
    // devtool: 'source-map',
    entry: entryPoint,
    output: outputObj,
    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },
    module: {
        rules: [
            // Allows Babel to do its thing
            { 
                test: /\.tsx$/, 
                exclude: [/node_modules/, /joi-browser/], 
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
            },

            // Allows mp3 files to be loaded
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },

            { test: /\.js$/, loader: 'babel-loader', exclude: [/node_modules/, /joi-browser/] }
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
                test: bundleRegex,
                name: "vendor",
                chunks: "all",
              }
            }
          }
    },
    plugins: [
        new BundleAnalyzerPlugin({analyzerMode: 'disabled'})
    ]
}

// Setting Webpack's Configuration
module.exports = clientConfig;