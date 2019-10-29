const path = require('path')

module.exports = {

    entry: ['./src/scripts/index.jsx'],

    output: {
        path: path.resolve(__dirname, 'public/scripts'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            { // scripts
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                resolve: {extensions: ['.js', '.jsx']},
                use: {
                    loader: 'babel-loader'
                }
            },
            { // styles
                test: /\.sass$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader',   // translates CSS into CommonJS
                    'sass-loader'   // compiles Sass to CSS`
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },

    devServer: {
        port: 6060,
        publicPath: '/scripts/',    // because index html importing script: src='scripts/bundle.js'
        contentBase: path.resolve(__dirname, 'public'),
        historyApiFallback: true, // for using BrowserRouter
        proxy: {
            '/tmdbapi': {
                target: 'https://api.themoviedb.org/3',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/tmdbapi': ''}
            },
            '/tmdbimg': {
                target: 'http://image.tmdb.org/t/p/w300',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/tmdbimg': ''}
            }
        }
    },

    devtool: 'source-map',
    mode: 'development'
}
