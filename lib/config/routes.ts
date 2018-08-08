import { Schemas } from '../schemas/index'

export const routes = {
  '/route/buildToDB': {
    'POST': {
      handler: 'RouteController.buildToDB',
      config: {
        prefix: 'cms.prefix',
        app: {
          permissions: {
            resource_name: 'apiPostRouteBuildToDB',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/buildToFL': {
    'POST': {
      handler: 'RouteController.buildToFL',
      config: {
        prefix: 'cms.prefix',
        app: {
          permissions: {
            resource_name: 'apiPostRouteBuildToFl',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/addPage': {
    'POST': {
      handler: 'RouteController.addPage',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.pageData
        },
        app: {
          permissions: {
            resource_name: 'apiPostRouteAddPage',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/editPage': {
    'PUT': {
      handler: 'RouteController.editPage',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.page
        },
        app: {
          permissions: {
            resource_name: 'apiPutRouteEditPage',
            roles: ['admin']
          }
        }
      }
    },
    'POST': {
      handler: 'RouteController.editPage',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.page
        },
        app: {
          permissions: {
            resource_name: 'apiPostRouteEditPage',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/removePage': {
    'DELETE': {
      handler: 'RouteController.removePage',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.pageRemove
        },
        app: {
          cms: {
            ignore: true
          },
          permissions: {
            resource_name: 'apiDeleteRouteRemovePage',
            roles: ['admin']
          }
        }
      }
    },
    'POST': {
      handler: 'RouteController.removePage',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.pageRemove
        },
        app: {
          cms: {
            ignore: true
          },
          permissions: {
            resource_name: 'apiPostRouteRemovePage',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/addSeries': {
    'POST': {
      handler: 'RouteController.addSeries',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.series
        },
        app: {
          permissions: {
            resource_name: 'apiPostRouteAddSeries',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/editSeries': {
    'PUT': {
      handler: 'RouteController.editSeries',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.series
        },
        app: {
          permissions: {
            resource_name: 'apiDeleteRouteEditSeries',
            roles: ['admin']
          }
        }
      }
    },
    'POST': {
      handler: 'RouteController.editSeries',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.series
        },
        app: {
          permissions: {
            resource_name: 'apiPostRouteEditSeries',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/removeSeries': {
    'DELETE': {
      handler: 'RouteController.removeSeries',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.seriesRemove
        },
        app: {
          permissions: {
            resource_name: 'apiDeleteRouteRemoveSeries',
            roles: ['admin']
          }
        }
      }
    },
    'POST': {
      handler: 'RouteController.removeSeries',
      config: {
        prefix: 'cms.prefix',
        validate: {
          // body: Schemas.seriesRemove
        },
        app: {
          permissions: {
            resource_name: 'apiPostRouteRemoveSeries',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/route/control': {
    'POST': {
      handler: 'RouteController.control',
      config: {
        prefix: 'cms.prefix',
        validate: {
          query: Schemas.controlQuery
          // body: Schemas.controlData
        },
        app: {
          permissions: {
            resource_name: 'apiPostRouteControl',
            roles: ['admin']
          }
        }
      }
    }
  }
}
