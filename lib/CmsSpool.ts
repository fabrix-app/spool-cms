import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'

import { Validator } from './validator'
import { Cms } from './cms'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class CmsSpool extends ExtensionSpool {

  private _cms: {[key: string]: any}

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this._cms = {
      cache: {},
      getRoutes: new Map,
      alternateRoutes: new Map,
      ignoreRoutes: new Map
    }

    this.extensions = {
      cms: {
        get: () => {
          return this.cms
        },
        set: (newCms) => {
          throw new Error('cms can not be set through FabrixApp, check spool-cms instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  get cms() {
    return this._cms
  }

  /**
   * Validate Dependencies and config
   */
  async validate () {
    const requiredSpools = ['express', 'sequelize', 'caches', 'generics']
    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-sitemap requires spools: ${ requiredSpools.join(', ') }!`))
    }

    if (!this.app.config.get('cms')) {
      return Promise.reject(new Error('No configuration found at config.cms!'))
    }

    // if (
    //   this.app.config.policies
    //   && this.app.config.policies['*']
    //   && this.app.config.policies['*'].indexOf('CheckPermissions.checkRoute') === -1
    // ) {
    //   this.app.log.warn('Cms Routes are unlocked! add \'*\' : [\'CheckPermissions.checkRoute\'] to config/policies.js')
    // }

    return Promise.all([
      Validator.validateCmsConfig(this.app.config.get('cms')),
      Validator.validateMiddleware(this.app.config.get('web.middlewares'))
    ])
  }

  /**
   * Configure the CMS
   */
  async configure () {
    return Promise.all([
      Cms.resolveGenerics(this.app),
      Cms.copyDefaults(this.app),
    ])
  }

  /**
   * TODO document method
   */
  async initialize () {
    return Promise.all([
      Cms.init(this.app),
      Cms.getRoutes(this.app),
      Cms.ignoreRoutes(this.app),
      Cms.alternateRoutes(this.app)
    ])
  }
}

