/**
 * Spool Configuration
 *
 * @see {@link http://fabrixjs.io/doc/spool/config
 */
export const spool = {
  type: 'extension',
  /**
   * API and config resources provided by this Spool.
   */
  provides: {
    resources: ['controllers', 'services', 'models'],
    api: {
      controllers: ['RouteController'],
      services: [
        'RouterControlsService',
      ],
      models: ['Event', 'EventItem', 'EventSubscriber']
    },
    config: [ 'engine', 'routes' ]
  },
  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other spools.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Spool
       */
      listen: [
        // 'spool:engine:configured',
        'spool:router:configured',
        'spool:generics:configured'
      ],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: [
        // 'spool:cms:configured'
      ]
    },
    initialize: {
      listen: [
        // Should wait til after routes have been fully Initialized before adding to them.
        // 'spool:router:initialized'
        // Should wait til after proxy engine has been initialized
        // 'spool:engine:initialized',
        'spool:router:initialized',
        'spool:generics:initialized'
      ],
      emit: [
        // 'spool:cms:initialized'
      ]
    }
  }
}

