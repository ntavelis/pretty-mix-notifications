'use strict';

module.exports = class Notifications {

    /**
     * Add custom config to the 'webpack-build-notifier'
     * @param config
     */
    register(config){
        this.config = config || {};
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
            let WebpackBuildNotifications = require('webpack-build-notifications');

            return new WebpackBuildNotifications(this.config);
        }
    }
};