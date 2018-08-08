import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'
import { Validator } from '../../validator'

// const _ = require('lodash')
/**
 * @module RouteController
 * @description Generated Fabrix.js Controller.
 */
export class RouteController extends Controller {
  /**
   * view
   * @param req
   * @param res
   * @returns html or error
   */
  view(req, res) {
    if (req.cms) {
      if (req.wantsJSON) {
        return res.json(req.cms)
      }
      else {
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(req.cms.document)
        return res.end()
      }
    }
    else {
      return res.sendStatus(404)
    }
  }
  /**
   * Make Flat File Manifest in Route Database
   * @param {Object} req
   * @param {Object} res
   */
  buildToDB(req, res) {
    const RouterDBService = this.app.services.RouterDBService
    RouterDBService.build()
      .then(() => {
        return res.sendStatus(200)
      })
      .catch((err) => {
        return res.serverError(err, req, res)
      })

  }

  /**
   * Manifest Route Database into Flat File
   * @param {Object} req
   * @param {Object} res
   */
  buildToFL(req, res) {
    const RouterFLService = this.app.services.RouterFLService
    RouterFLService.build()
      .then(() => {
        return res.sendStatus(200)
      })
      .catch((err) => {
        return res.serverError(err, req, res)
      })
  }

  /**
   * addPage
   * @param {Object} req
   * @param {Object} res
   */
  addPage(req, res) {
    const RouterService = this.app.services.RouterService
    Validator.validatePageData(req.body)
      .then(values => {
        return RouterService.addPage(req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        // console.log('RouterContoller.addpage', err)
        return res.serverError(err)
      })
  }

  /**
   * editPage
   * @param {Object} req
   * @param {Object} res
   */
  editPage(req, res) {
    const RouterService = this.app.services.RouterService
    Validator.validatePageData(req.body)
      .then(values => {
        return RouterService.editPage(req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   * removePage
   * @param {Object} req
   * @param {Object} res
   */
  removePage(req, res) {
    const RouterService = this.app.services.RouterService
    Validator.validatePageRemoveData(req.body)
      .then(values => {
        return RouterService.removePage(req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   * addSeries
   * @param {Object} req
   * @param {Object} res
   */
  addSeries(req, res) {
    const RouterService = this.app.services.RouterService
    Validator.validateSeriesData(req.body)
      .then(values => {
        return RouterService.addSeries(req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   * removeSeries
   * @param {Object} req
   * @param {Object} res
   */
  removeSeries(req, res) {
    const RouterService = this.app.services.RouterService
    Validator.validateSeriesRemoveData(req.body)
      .then(values => {
        return RouterService.removeSeries(req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   * editSeries
   * @param {Object} req
   * @param {Object} res
   */
  editSeries(req, res) {
    const RouterService = this.app.services.RouterService
    Validator.validateSeriesEditData(req.body)
      .then(values => {
        return RouterService.editSeries(req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  /**
   * control
   * @param {Object} req
   * @param {Object} res
   */
  control(req, res) {
    const RouterControlsService = this.app.services.RouterControlsService
    // console.log(req.body)
    // Type query validated by route
    const type = req.query.type
    // Validate the control data
    Validator.validateControlData(req.body)
      .then(values => {
        return RouterControlsService[type](req.body)
      })
      .then(data => {
        return res.json(data)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
}
