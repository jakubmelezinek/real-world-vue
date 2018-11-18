const path = require('path');

module.exports = {
    mode: "development",
    entry: './intro/intro.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    }
};