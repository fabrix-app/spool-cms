import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SERIES } from '../../enums'

/**
 * @module RouteDocument
 * @description Route Document model
 */
export class RouteDocument extends Model {

  static config (app, Sequelize) {
    return {
      options: {
        underscored: true,
        enums: {
          /**
           * Expose SERIES enums
           */
          SERIES: SERIES
        },
        hooks: {
          // Combine meta and content into document
          afterCreate: [
            (values, options) => {

            }
          ],
          // Combine meta and content into document
          afterUpdate: [
            (values, options) => {

            }
          ]
        }
      }
    }
  }
  // TODO a way to track positive and negative controls. This would require huge volumes of storage, hadoop?
  static schema (app, Sequelize) {
    return {
      // non-unique url can be a normal string or regex (should match the regex of a Route model)
      // url: {
      //   type: Sequelize.STRING,
      //   allowNull: false
      // },
      // The Page this Document belongs to
      // parent: {
      //   type: Sequelize.String
      // },

      // The host if using Multi-Site, localhost if not using Multi-Site
      host: {
        type: Sequelize.STRING,
        defaultValue: 'localhost'
      },
      // The version of this route and series test,
      version: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '0.0.0' // Matches SemVer
      },
      // Series test: default is 'a0'
      series: {
        type: Sequelize.ENUM,
        values: Object.values(SERIES),
        defaultValue: SERIES.A0
      },
      // Meta of the page
      meta: {
        type: Sequelize.JSONB,
        defaultValue: {
          'title': '',
          'keywords': '',
          'runs': 0,
          'score': 0.0
        }
      },
      // The body of a page in HTML and/or Markdown
      content: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      // Markdown doc with yaml, the combination of `meta` and `content` composed after meta or content are created/updated.
      document: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      // An optional style sheet to be applied to the Route Document
      stylesheet: {
        type: Sequelize.TEXT,
        allowNull: true
      }
    }
  }

  static associate (models) {
    models.RouteDocument.belongsTo(models.Route, {
      // as: 'route_id',
      onDelete: 'CASCADE'
      // ,
      // foreignKey: {
      //   primaryKey: true,
      //   name: 'routePath',
      //   allowNull: false
      // }
    })
  }
}
