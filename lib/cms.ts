import { FabrixApp } from '@fabrix/fabrix'
import { RenderGeneric } from '@fabrix/generics-render'
const _ = require('lodash')

export const cms = {
  /**
   * init - Initialize
   * @param app
   */
  init: (app: FabrixApp) => {
    if (app.config.get('cms.force_fl')) {
      app.services.RouterSitemapService.initFL()
    }
    else {
      // TODO sitemap DB
    }
    return Promise.resolve({})
  },

  /**
   * ignoreRoutes - Add ignored routes
   * @param app
   */
  ignoreRoutes: (app: FabrixApp) => {
    app.cms.ignoreRoutes = []

    // app.config.routes.forEach((route) => {
    //   // If the route is not a GET route
    //   if (route.method !== 'GET' && (_.isObject(route.method) && route.method.indexOf('GET') == -1)) {
    //     return
    //   }
    //   // If route has a config with ignore
    //   if (route.config && route.config.app && route.config.app.cms && route.config.app.cms.ignore) {
    //     app.cms.ignoreRoutes.push(route.path)
    //   }
    //   return
    // })
    // app.cms.ignoreRoutes.reverse()
    app.log.debug('cms.ignoreRoutes', app.cms.ignoreRoutes)
    return Promise.resolve({})
  },
  /**
   * alternateRoutes - Add alternate routes (routes that have dynamic params)
   * @param app
   */
  alternateRoutes: (app: FabrixApp) => {
    app.cms.alternateRoutes = []

    // app.config.routes.forEach((route) => {
    //   // If the route is not a GET route
    //   if (route.method !== 'GET' && (_.isObject(route.method) && route.method.indexOf('GET') === -1)) {
    //     return
    //   }
    //   // If route has a config with ignore
    //   if (route.path.indexOf(':') > -1 || route.path.indexOf('*') > -1) {
    //     app.cms.alternateRoutes.push(route.path)
    //   }
    //   return
    // })
    // app.cms.alternateRoutes.reverse()
    return Promise.resolve({})
  },
  /**
   * resolveGenerics - adds default generics if missing from configuration
   * @param app
   * @returns {Promise.<{}>}
   */
  /**
   * resolveGenerics - adds default generics if missing from configuration
   * @param app
   * @returns {Promise.<{}>}
   */
  resolveGenerics: (app: FabrixApp) => {
    if (!app.config.get('generics.render_service.adapter')) {
      app.config.set('generics.render_service', {
        adapter: RenderGeneric,
        config: {
          // Must always be set to true
          html: true,
          plugins: [
            // Example Plugin (markdown-it-meta is required and already installed)
            // {
            //   plugin: require('markdown-it-meta'),
            //   options: {}
            // }
          ]
        }
      })
    }
    return Promise.resolve({})
  },
  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app) => {
    app.config.set('cmsDefaults', _.clone(app.config.get('cms')))
    return Promise.resolve({})
  }
}
