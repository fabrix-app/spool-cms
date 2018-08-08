import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
const _ = require('lodash')
/**
 * @module RouterDBService
 * @description Binds Flat Files to Router Database
 */
export class RouterDBService extends Service {
  /**
   * build
   * @returns {Promise.<T>}
   */
  // TODO build Database to Flat File
  build() {
    return Promise.resolve()
  }
  /**
   * get
   * @param req
   * @returns {Promise.<{id: number, meta: {}, page: string}>}
   */
  // TODO
  get(req) {
    const prefix = this.app.config.get('cms.prefix') || this.app.config.get('router.prefix')
    const url = req.originalUrl.replace(prefix, '/')

    console.log('RouterDBService.get original:', req.originalUrl, 'altered:', url, 'base:', req.baseUrl)
    // const RouterService = this.app.services.RouterService
    // const Tapestrieservice = this.app.services.Tapestrieservice
    // return Tapestrieservice.find('RouteDocument', id)
    return Promise.resolve({
      id: 1,
      meta: {},
      page: 'Hello World'
    })

  }

  /**
   * create
   * @param regPath
   * @param options
   * @returns {Route}
   */
  create(regPath, options) {
    const Tapestrieservice = this.app.services.Tapestrieservice
    return Tapestrieservice.create('Route', {
      path: regPath
    })
  }
  // TODO
  createSeries(data) {
    return Promise.resolve(data)
  }

  /**
   * update
   * @param regPath
   * @param options
   * @returns {*|Progress|Object|Promise}
   */
  update(regPath, options) {
    const Tapestrieservice = this.app.services.Tapestrieservice
    const update = {}
    _.each(options, (val, opt) => {
      update[opt] = val
    })
    return Tapestrieservice.update('Route', { path: regPath }, update)
  }
  // TODO
  updateSeries(data) {
    return Promise.resolve(data)
  }

  /**
   * destroy
   * @param regPath
   * @param options
   * @returns {*|Promise}
   */
  destroy(regPath, options) {
    const Tapestrieservice = this.app.services.Tapestrieservice
    return Tapestrieservice.destroy('Route', {
      path: regPath
    })
  }
  // TODO
  destroySeries(data) {
    return Promise.resolve(data)
  }
  // TODO
  resolveDBFromFlatFileString(orgPath, options) {}

  /**
   * checkIfRecord
   */
  checkIfRecord(idenfitifer) {
    return new Promise((resolve, reject) => {

      const Tapestrieservice = this.app.services.Tapestrieservice
      Tapestrieservice.find('Route', idenfitifer)
        .then(routes => {
          if (routes.length === 0) {
            throw new Error(`Route not found for: ${idenfitifer}`)
          }
          return resolve(routes[0])
        })
        .catch(err => {
          return reject(err)
        })
    })
  }
}
