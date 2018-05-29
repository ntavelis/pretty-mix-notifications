'use strict';

module.exports = class Notifications {

    constructor() {
        this.defaultConfig = {
            title: "Webpack build",
            successIcon: path.resolve("./pretty-mix-notifications/icons/success.png"),
            warningIcon: path.resolve("./pretty-mix-notifications/icons/warning.png"),
            failureIcon: path.resolve("./pretty-mix-notifications/icons/failure.png"),
            compileIcon: path.resolve("./pretty-mix-notifications/icons/compile.png"),
        }
    }

    register(config){
        this.config = config;
    }

    webpackConfig(config) {
        config.plugins.forEach((value, index) => {
            if (value.options !== undefined) {
                if (value.options.title === 'Laravel Mix') {
                    config.plugins.splice(index, 1);
                }
            }
        });
    }

    /**
     * webpack plugins to be appended to the master config.
     */
    webpackPlugins() {
        if (Mix.isUsing('notifications')) {
            let WebpackBuildNotifierPlugin = require('webpack-build-notifier');

            return new WebpackBuildNotifierPlugin(this.config || this.defaultConfig);
        }
    }
}