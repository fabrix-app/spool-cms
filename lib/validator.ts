import * as joi from 'joi'
import { Schemas } from './schemas/index'

export const Validator = {
  validateDatabaseConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, Schemas.databaseConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.database: ' + err))
        }
        return resolve(value)
      })
    })
  },
  validateCmsConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, Schemas.cmsConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.cms: ' + err))
        }
        return resolve(value)
      })
    })
  },
  validateMiddleware (middlewares) {
    return new Promise((resolve, reject) => {
      // console.log(middlewares.order)
      joi.validate(middlewares, Schemas.cmsMiddleware, (err, value) => {
        if (err) {
          return reject(new TypeError('config.web.middlewares: ' + err))
        }
        return resolve(value)
      })
    })
  },
  // Validate a Page
  validatePageData (data) {
    return new Promise((resolve, reject) => {
      joi.validate(data, Schemas.pageData, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  },
  validatePageRemoveData (data) {
    return new Promise((resolve, reject) => {
      joi.validate(data, Schemas.pageRemoveData, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  },
  // Validate a Series
  validateSeriesData (data) {
    return new Promise((resolve, reject) => {
      joi.validate(data, Schemas.seriesData, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  },
  validateSeriesEditData (data) {
    return new Promise((resolve, reject) => {
      joi.validate(data, Schemas.seriesEditData, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  },
  validateSeriesRemoveData (data) {
    return new Promise((resolve, reject) => {
      joi.validate(data, Schemas.seriesRemoveData, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  },
  // Validate a Run
  validateAddRunData (data) {
    return new Promise((resolve, reject) => {
      // console.log(middlewares.order)
      joi.validate(data, Schemas.addRun, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  },
  // Validate a Control
  validateControlData (data) {
    return new Promise((resolve, reject) => {
      // console.log(middlewares.order)
      joi.validate(data, Schemas.controlData, (err, value) => {
        if (err) {
          return reject(new Errors.ValidationError(err))
        }
        return resolve(value)
      })
    })
  }
}
