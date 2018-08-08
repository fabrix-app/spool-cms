import * as joi from 'joi'
export const Schemas = {
  // Validate a datbase config
  databaseConfig: joi.object().keys({
    orm: joi.string(),
    models: joi.object().keys({
      defaultStore: joi.string().required(),
      migrate: joi.string()
    }),
    stores: joi.object()
  }),

  // Validate config.cms or
  cmsConfig: joi.object().keys({
    // Default extension to use for files
    default_extension: joi.string().valid('.md', '.html'),
    // Default Prefix to use
    prefix: joi.string(),
    // Default Threshold
    threshold: joi.number().required(),
    // Default Baseline
    baseline: joi.number().required(),
    // Default Weight
    weight: joi.number().required(),
    // Default Flat File Folder
    folder: joi.string().required(),
    // Default name for "series"
    series: joi.string().required(),
    // Force Flat File and ignore DB
    force_fl: joi.boolean().required(),
    // The number of controls to enqueue before flushing.
    flush_at: joi.number().required(),
    // The number of milliseconds to wait before flushing the queue automatically.
    flush_after: joi.number().required(),
    // Cache
    cache: joi.object().keys({
      prefix: joi.string().required(),
      allow: joi.any(), // .boolean(), // .required(),
      eject: joi.number().required()
    }),
    multisite: joi.alternatives().try(joi.any() /* joi.boolean()*/ , joi.array().items(joi.string())).required()
  }),

  // Validate web.middlewares
  cmsMiddleware: joi.object().keys({
    order: joi.array().items(joi.string(), joi.string().label('proxyroute').required()),
    proxyroute: joi.func()
  }).unknown(),

  // Validate an addRun control
  addRun: joi.object().keys({
    id: joi.any().required(),
    meta: joi.object().required(),
    page: joi.string().required()
  }),

  // Validate a control
  controlData: joi.object().keys({
    identifier: joi.any().required(),
    demographic: joi.string(),
    payload: joi.object().required()
  }).unknown(),

  controlQuery: joi.object().keys({
    type: joi.string().valid('negative', 'positive')
  }),

  // Validate a page
  pageData: joi.object().keys({
    identifier: joi.any().required(),
    options: joi.object().keys({
      series: joi.string(),
      demographics: joi.array(),
      threshold: joi.number(),
      weight: joi.number(),
      baseline: joi.number()
    })
  }),

  // Validate a page
  pageRemoveData: joi.object().keys({
    identifier: joi.any().required()
  }),

  // Validate a series
  seriesData: joi.object().keys({
    identifier: joi.any().required(),
    series: joi.string(),
    version: joi.string(),
    meta: joi.object(),
    content: joi.string(),
    document: joi.string()
  }),

  // Validate a Edit series
  seriesEditData: joi.object().keys({
    identifier: joi.any().required(),
    series: joi.string().required(),
    version: joi.string().required(),
    meta: joi.object(),
    content: joi.string(),
    document: joi.string()
  }),

  // Validate a series
  seriesRemoveData: joi.object().keys({
    identifier: joi.any().required(),
    series: joi.string().required()
  })
}
