'use strict';

module.exports = class Notifications {

    /**
     * Initialize with our own default configuration
     */
    constructor() {
        this.defaultConfig = {
            title: "Webpack build",

            successIcon: Mix.paths.root('node_modules/pretty-mix-notifications/icons/success.png'),
            warningIcon: Mix.paths.root('node_modules/pretty-mix-notifications/icons/warning.png'),
            failureIcon: Mix.paths.root('node_modules/pretty-mix-notifications/icons/failure.png'),
            compileIcon: Mix.paths.root('node_modules/pretty-mix-notifications/icons/compile.png'),
        }
    }

    /**
     * Add custom config to the 'webpack-build-notifier'
     * @param config
     */
    register(config){
        this.config = config;
    }

    /**
     * Remove the laravel mix notification plugin, so that we can use our own
     * @param config
     */
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
     * Appended our webpack notification plugin to the master config.
     * If the user haven't disabled the mix notifications
     */
    webpackPlugins() {
        if (Mix.isUsing('notifications')) {
            let WebpackBuildNotifierPlugin = require('webpack-build-notifier');

            const mergedConfig = Object.assign({}, this.defaultConfig, this.config);
            return new WebpackBuildNotifierPlugin(mergedConfig);
        }
    }
}