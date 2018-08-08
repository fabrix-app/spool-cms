import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'

/**
 * @module Route
 * @description Route model
 */
export class Route extends Model {

  static config(app, Sequelize) {
    return {
      options: {
        underscored: true
      }
    }
  }

  static schema(app, Sequelize) {
    return {
      // The host if using Multi-Site, localhost if not using Multi-Site
      host: {
        type: Sequelize.STRING,
        defaultValue: 'localhost'
      },
      // The path of the Page
      path: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      // Array of Variation Tests to run
      series: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      // {
      //   type: Sequelize.ARRAY(Sequelize.JSON)
      // },
      // The weight score for a series test
      weight: {
        type: Sequelize.INTEGER,
        defaultValue: app.config.get('cms.weight')
      },
      // The amount of runs required to auto serve a test series to a demographic once the baseline is met
      threshold: {
        type: Sequelize.INTEGER,
        defaultValue: app.config.get('cms.threshold')
      },
      // the lowest score before the threshold can take over.
      baseline: {
        type: Sequelize.FLOAT,
        defaultValue: app.config.get('cms.baseline')
      },
      // Array of Series run for particular demographics
      demographics: {
        type: Sequelize.JSONB,
        defaultValue: [
          {
            'unknown': [
              {
                document: '',
                runs: 0,
                score: 0.0
              }
            ]
          }
        ]
      }
      // id of the parent of the route. Could be a Relationship?
      // parent: {
      //   type: Sequelize.STRING
      //   // allowNull: false
      // }
      // array of siblings route ids. Could be a relationship?
      // siblings: {},
      // array of children route ids. Could be a relationship?
      // children: {}
    }
  }

  /**
   * Associate Models
   */
  static associate (models)  {
    models.Route.hasMany(models.RouteDocument, {
      as: 'documents',
      onDelete: 'CASCADE'
      // ,
      // foreignKey: {
      //   name: 'routeName',
      //   allowNull: false
      // }
    })
  }
}
