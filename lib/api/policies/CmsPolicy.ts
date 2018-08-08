const _ = require('lodash')
import { FabrixPolicy as Policy } from '@fabrix/fabrix/dist/common'

/**
 * @module CmsPolicy
 * @description Proxy Router Add cms
 */
export class CmsPolicy extends Policy {
  cms(req, res, next) {
    const RouterService = this.app.services.RouterService
    if (RouterService.isCmsRequest(req)) {
      // Time Event
      const t0 = process.hrtime()
      let t1
      let t
      // Check cache
      RouterService.isCached(req)
        .then(route => {
          if (route) {
            // Log Time
            t1 = process.hrtime(t0)
            t = t1[1] / 1e6
            this.app.log.debug(`cms.render ${t}ms`)
            // Continue to next middleware
            return next()
          }
          else {
            return
          }
        })
        .then(route => {
          // Set req.route
          req.route = route
          // Resolve the route
          return RouterService.resolveProxyRoute(req)
        })
        .then(cms => {
          // set request cms attribute
          req.cms = cms
          // set the locals (used in ejs and other template engines)
          req.locals = _.defaults(req.locals, { cms: req.cms })
          // Log Time
          t1 = process.hrtime(t0)
          t = t1[1] / 1e6
          this.app.log.debug(`cms.render ${t}ms`)
          return next()
        })
        .catch((err) => {
          // Log Time
          t1 = process.hrtime(t0)
          t = t1[1] / 1e6
          this.app.log.debug(`cms.render ${t}ms`)
          this.app.log.debug(err)
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

