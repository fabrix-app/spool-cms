import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'

/**
 * @module RouteControl
 * @description A record of a Route Control
 * @generator Treefrog for Fabrix.js Model.
 */
export class RouteControl extends Model {

  static get resolver() {
    return SequelizeResolver
  }

  static config (app, Sequelize) {
    return {
      options: {
        underscored: true,
        classMethods: {
          /**
           * Associate Models
           */
          associate: (models) => {
            models.RouteControl.belongsTo(models.Route, {
              // as: 'route_id',
              onDelete: 'CASCADE'
              // ,
              // foreignKey: {
              //   primaryKey: true,
              //   name: 'routePath',
              //   allowNull: false
              // }
            }),
            models.RouteControl.belongsTo(models.RouteDocument, {
              // as: 'document_id',
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
      }
    }
  }

  static schema (app, Sequelize) {
    return {
      // The Score of this control
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      positive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    }
  }
}
