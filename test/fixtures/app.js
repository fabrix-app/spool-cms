'use strict'
const _ = require('lodash')
const smokesignals = require('smokesignals')
const fs = require('fs')
// const ModelPassport = require('@fabrix/spool-passport/dist/api/models/User').User
// const ModelPermissions = require('@fabrix/spool-permissions/api/models/User').User
const lib = require('../../dist/index')
const Controller = require('@fabrix/fabrix/dist/common').FabrixController
const fsStore = require('cache-manager-fs')


const App = {
  pkg: {
    name: 'cms-spool-test',
    version: '1.0.0'
  },
  api: {
    controllers: {
      TestController: class TestController extends Controller {
        test(req, res) {
          if (req.cms.document || req.cms.meta) {
            return res.serverError('THIS SHOULD NOT HAVE A PROXY ROUTER OBJECT')
          }
          return res.sendStatus(200)
        }
      }
    }
  },
  config: {
    stores: {
      sqlitedev: {
        orm: 'sequelize',
        database: 'Sequelize',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrate: 'drop'
      },
      uploads: {
        orm: 'sequelize',
        database: 'Sequelize',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrate: 'drop'
      }
    },
    models: {
      defaultStore: 'sqlitedev',
      migrate: 'drop'
    },
    routes: {
      '/hello/:world': {
        'GET': {
          handler: 'RouteController.view',
          config: {
            app: {
              cms: {
                include: true
              }
            }
          }
        }
      },
      '/hello/ignore': {
        'GET': 'TestController.test',
        'POST': 'TestController.test',
        config: {
          app: {
            cms: {
              ignore: true
            }
          }
        }
      },
      '/no/cms': {
        'GET': {
          handler: 'TestController.test'
        }
      },
      '/html': {
        'GET': {
          handler: 'RouteController.view',
          config: {
            app: {
              cms: {
                include: true
              }
            }
          }
        }
      },
      '/json': {
        'GET': {
          handler: 'RouteController.view',
          config: {
            app: {
              cms: {
                include: true
              }
            }
          }
        }
      },
      '/': {
        'GET': {
          handler: 'RouteController.view',
          config: {
            app: {
              cms: {
                include: true
              }
            }
          }
        }
      }
    },
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-sequelize').SequelizeSpool,
        require('@fabrix/spool-express').ExpressSpool,
        require('@fabrix/spool-email').EmailSpool,
        require('@fabrix/spool-generics').GenericsSpool,
        require('@fabrix/spool-passport').PassportSpool,
        require('@fabrix/spool-permissions').PermissionsSpool,
        // require('@fabrix/spool-notifications').NotificationsSpool,
        require('@fabrix/spool-engine').EngineSpool,
        require('@fabrix/spool-sitemap').SitemapSpool,
        require('@fabrix/spool-caches').CachesSpool,
        require('../../dist').CmsSpool // spool-cms
      ]
    },
    web: {
      express: require('express'),
      middlewares: {
        order: [
          'static',
          'addMethods',
          'cookieParser',
          'session',
          'bodyParser',
          'passportInit',
          'passportSession',
          'methodOverride',
          'cms',
          'router',
          'www',
          '404',
          '500'
        ],
        cms: (req, res, next) => {
          return lib.Middleware.cms(req, res, next)
        },
        static: require('express').static('test/static')
      }
    },
    log: {
      logger: new smokesignals.Logger('debug')
    },
    cms: {
      // The Default Extension
      default_extension: '.md',
      // Default Threshold
      threshold: 10,
      // Default Baseline
      baseline: 0.75,
      // Default Weight
      weight: 50,
      // Default Flat File Folder
      folder: 'content',
      // Default name for "series"
      series: 'series',
      // Force Flat File and ignore DB
      force_fl: true,
      // The number of controls to enqueue before flushing to processor.
      flush_at: 20,
      // The number of milliseconds to wait before flushing the queue automatically to processor.
      flush_after: 10000,
      // Cache
      cache: {
        // The datastore prefix
        prefix: 'memory',
        // Allow Caching
        allow: true,
        // Milliseconds before cache is ejected
        eject: 10000
      },
      // If multi-site is enabled either false or an array e.g. ['website1.com','website2.com']
      multisite: false
    },
    caches: {
      stores: [
        {
          name: 'memory',
          store: 'memory',
          max: 100,
          ttl: 0
        }, {
          name: 'fs',
          store: fsStore
        }
      ],
      defaults: ['memory']
    },
    generics: {},
    engine: {
      live_mode: false,
      profile: 'test'
    },
    passport: {
      strategies: {
        local: {
          strategy: require('passport-local').Strategy
        }
      }
    },
    permissions: {
      defaultRole: 'public',
      defaultRegisteredRole: 'registered',
      modelsAsResources: true,
      fixtures: {
        roles: [{
          name: 'admin',
          public_name: 'Admin'
        }, {
          name: 'registered' ,
          public_name: 'Registered'
        }, {
          name: 'public' ,
          public_name: 'Public'
        }],
        permissions: []
      },
      defaultAdminUsername: 'admin',
      defaultAdminPassword: 'admin1234'
    },
    sitemap: {
      host: 'https://test.com',
      cache: 100000
    }
  }
}
const dbPath = __dirname + './test.sqlite'
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath)
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
