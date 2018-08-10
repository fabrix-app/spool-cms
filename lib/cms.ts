import { FabrixApp } from '@fabrix/fabrix'
import { RenderGeneric } from '@fabrix/generics-render'
import { get, clone } from 'lodash'

export const Cms = {
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

  getRoutes: (app: FabrixApp) => {
    app.routes.forEach(function(route, path, map) {
      if (!route.GET) {
        return
      }
      if (get(route.GET, 'config.app.cms.include')) {
        app.cms.getRoutes.set(path, route)
      }
      if (get(route, 'config.app.cms.include')) {
        app.cms.getRoutes.set(path, route)
      }
    })
    app.cms.getRoutes = new Map([...app.cms.getRoutes].reverse())
    app.log.debug('cms.getRoutes', app.cms.getRoutes)
    return Promise.resolve({})
  },
  /**
   * ignoreRoutes - Add ignored routes
   * @param app
   */
  ignoreRoutes: (app: FabrixApp) => {
    app.routes.forEach(function(route, path, map) {
      if (!route.GET) {
        return
      }
      if (get(route.GET, 'config.app.cms.ignore')) {
        app.cms.ignoreRoutes.set(path, route)
      }
      if (get(route, 'config.app.cms.ignore')) {
        app.cms.ignoreRoutes.set(path, route)
      }
    })
    app.cms.ignoreRoutes = new Map([...app.cms.ignoreRoutes].reverse())
    app.log.debug('cms.ignoreRoutes', app.cms.ignoreRoutes)
    return Promise.resolve({})
  },
  /**
   * alternateRoutes - Add alternate routes (routes that have dynamic params)
   * @param app
   */
  alternateRoutes: (app: FabrixApp) => {
    app.routes.forEach(function(route, path, map) {
      if (!route.GET) {
        return
      }
      if (get(route.GET, 'config.app.cms.include') && (path.indexOf(':') > -1 || path.indexOf('*') > -1)) {
        app.cms.alternateRoutes.set(path, route)
      }
      if (get(route, 'config.app.cms.include') && (path.indexOf(':') > -1 || path.indexOf('*') > -1)) {
        app.cms.alternateRoutes.set(path, route)
      }
    })
    app.cms.alternateRoutes = new Map([...app.cms.alternateRoutes].reverse())
    app.log.debug('cms.alternateRoutes', app.cms.alternateRoutes)
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
  copyDefaults: (app: FabrixApp) => {
    app.config.set('cmsDefaults', clone(app.config.get('cms')))
    return Promise.resolve({})
  }
}
