'use strict';

module.exports = class Notifications {

    constructor() {
        this.defaultConfig = {
            title: 'Laravel-Mix build'
        }
    }

    /**
     * Add custom config to the 'webpack-build-notifications'
     * @param config
     */
    register(config) {
        this.config = config || {};
    }

    /**
     * Remove the laravel mix notifications plugin, so that we can use our own
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
     * Append our webpack notifications plugin, to the master config.
     * If the mix notifications are enabled.
     */
    webpackPlugins() {
        if (Mix.isUsing('notifications')) {
            let WebpackBuildNotifications = require('webpack-build-notifications');

            return new WebpackBuildNotifications(Object.assign(this.defaultConfig, this.config));
        }
    }
};