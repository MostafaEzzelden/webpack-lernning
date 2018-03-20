const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');

const PurifyCSSPlugin = require('purifycss-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


let isProduction = (process.env.NODE_ENV === 'production');

let BuildMainfestPlugin = require('./build/build-mainfest-plugin');


module.exports = {

    entry: {

        main: [
            "./src/main.js"
        ],

        vendor: ['jquery']

    },

    output: {

        path: path.resolve(__dirname, '..', './dist'),
        filename: "[name].[chunkhash].js"

    },



    module: {

        rules: [


            {

                test: /\.js$/,

                exclude: /node_modules/,
                loader: "babel-loader"

            },


            {

                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: "style-loader"
                })
            },



            {

                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: "css-loader",
                    fallback: "style-loader"

                })
            },

            {

                test: /\.(svg|eot|ttf|woff|woff2)$/,

                use: "file-loader"

            },


            {
                test: /\.(png|jpe?g|gif)$/,
                loaders: [{
                        loader: "file-loader",
                        options: {
                            name: 'images/[name].[hash].[ext]'
                        }
                    },

                    "img-loader"

                ]


            }


        ]
    },


    plugins: [

        new CleanWebpackPlugin(['dist'], {
            root: path.join(__dirname, '..'),
            verbose: true,
            dry: false
        }),

        new ExtractTextPlugin("[name].[chunkhash].css"),

        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, '..', 'index.html')),
            minimize: isProduction
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: isProduction
        }),

        new BuildMainfestPlugin()

        // function() {
        //   this.plugin('done', (stats) => {

        //     require('fs').writeFileSync(
        //       path.join(__dirname, '..', 'dist/mainfest.json'),

        //       JSON.stringify(stats.toJson().assetsByChunkName)
        //     )
        //   });
        // }

    ]


}


if (isProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
