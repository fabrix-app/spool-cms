/* eslint no-console: [0, { allow: ["log","warn", "error"] }] */

'use strict'
const _ = require('lodash')
module.exports = {
  cms: function (req, res, next) {

    const RouterService = req.fabrixApp.services.RouterService
    if (RouterService.isCmsRequest(req)) {
      // Time Event
      const t0 = process.hrtime()
      let t1
      let t
      // Check cache
      RouterService.isCached(req)
        .then(route => {
          if (route) {
            // set request cms attribute
            route.cached = true
            route.cached_at = new Date()

            // req.cms = route
            // req.locals = _.defaults(req.locals, { cms: req.cms })
            //
            // // Log Time
            // t1 = process.hrtime(t0)
            // t = t1[1] / 1e6
            // req.fabrixApp.log.debug(`cms.render ${t}ms`)
            // Continue to next middleware
            return route
          }
          else {
            // Otherwise set the prerequisites for the route
            return RouterService.setPreReqRoute(req)
          }
        })
        .then(route => {
          // if (!route) {
          //   throw new Error('No Route')
          // }
          // Set req.route
          req.route = route
          // Resolve the route
          return RouterService.resolveProxyRoute(req)
        })
        .then(cms => {
          // if (!cms) {
          //   throw new Error('No Route')
          // }
          // set request cms attribute
          req.cms = cms
          // set the locals (used in ejs and other template engines)
          req.locals = _.defaults(req.locals, { cms: req.cms })
          // Log Time
          t1 = process.hrtime(t0)
          t = t1[1] / 1e6
          req.fabrixApp.log.debug(`cms.render ${t}ms`)
          return next()
        })
        .catch((err) => {
          // Log Time
          t1 = process.hrtime(t0)
          t = t1[1] / 1e6
          req.fabrixApp.log.debug(`cms.render ${t}ms`)
          req.fabrixApp.log.debug(err)
          // set the request attribute to false
          req.cms = false
          // Continue to next middleware
          return next()
        })
    }
    else {
      // Otherwise, set the request attribute to false
      req.cms = false
      next()
    }
  }
}
