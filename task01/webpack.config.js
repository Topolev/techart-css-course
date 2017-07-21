var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var path = require("path");



const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: (getPath) => {
        return getPath('css/[name].css').replace('css/js', 'css');
    },
    allChunks: true
});

var BUILD_DIR = path.resolve(__dirname, "build");
var SRC_DIR = path.resolve(__dirname, "src");


module.exports = {
    entry: {
        bundle: SRC_DIR + "/js/main.js"
    },
    output: {
        path: BUILD_DIR + "/",
        filename: '[name].js',
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js?/,
                exclude: /(node_modules|bower_components)/,
                include: SRC_DIR,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015', 'stage-2']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[name].[ext]',
            }, {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    plugins: [
        extractSass,
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename:  "/index.html"
        })
        /*,
        new CopyWebpackPlugin([
            // {output}/file.txt
            {from: SRC_DIR + "/index.html", to: BUILD_DIR + "/index.html"}
        ])*/]
};