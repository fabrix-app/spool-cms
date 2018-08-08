/**
 * CMS Configuration
 *
 * @see {@link http://
 */
export const cms = {
  default_extension: '.md',
  // Default Threshold
  threshold: 100,
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
  // Cache Service
  cache: {
    // The redis datastore prefix
    prefix: 'pxy',
    // Allow Caching
    allow: true,
    // Milliseconds before cache is ejected
    eject: 10000
  },
  // Hooks for events
  // hooks: {
  //   beforeControl: (data) => {
  //
  //   },
  //   afterControl: (data) => {
  //
  //   }
  // },
  // If multi-site is enabled either false or an array e.g. ['website1.com','website2.com']
  multisite: false
}
