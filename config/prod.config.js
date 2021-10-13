const path = require('path');
const fs = require('fs')
const CopyPlugin = require("copy-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');
const qext = require('./ntt-ext.config.json')

var plugins = [
    new CopyPlugin({
        patterns: [
            { from: "./src/" + qext.name + ".json", to: qext.name + ".qext" },
        ],
    }),
]

var deployPath = qext.deployPath

if (deployPath) {
    deployPath = path.join(deployPath, qext.name)
    plugins.push(
        new FileManagerPlugin({
            events: {
                onEnd: [{
                    copy: [
                        {
                            source: path.join(__dirname, '../dist/dev/'),
                            destination: deployPath
                        }
                    ]
                }]
            }
        }))
}




module.exports = {
    entry: './src/' + qext.name + '.js',
    output: {
        filename: qext.name + '.js',
        path: path.resolve(__dirname, '../dist/dev'),
        clean: true,
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
          
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    // Disables attributes processing
                    sources: false,
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    plugins: plugins,
    watch: false,
};