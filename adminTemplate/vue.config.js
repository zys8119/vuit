const VueConfig = require("./src/utils/vue.config");
const webpack = require("webpack");
const VueConfigInit = new VueConfig();
const path = require("path");
const TscServe = require("./TscServe");
const ignores = require("./tsc.ignores");
module.exports = {
    chainWebpack: (config) => {
        VueConfigInit.setLessGlobalVariables(config);
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin(VueConfigInit.setJsGlobalVariables()),
            new TscServe({
                ignores:ignores,
                directory:path.resolve()
            })
        ],
    },
};