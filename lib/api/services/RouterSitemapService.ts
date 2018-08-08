/* eslint no-console: [0] */
'use strict'
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
// const imageRegex = /\.(gif|jp?g|png|svg)$/

/**
 * @module RouterSitemapService
 * @description Build Sitemap
 */
export class RouterSitemapService extends Service {
  public pwd
  public flat

  constructor(app) {
    super(app)
    // Flat Map
    this.pwd = this.app.config.get('cms.folder')
    this.flat = []
  }

  initFL() {
    const pwd = this.app.config.get('cms.folder')
    const sitemap = this.buildChildrenFL(pwd)
    return this.app.cms.sitemap = sitemap
  }

  flatMap() {
    const pwd = this.app.config.get('cms.folder')
    this.flat = []
    this.buildChildrenFL(pwd, true)
    return this.flat.slice()
  }

  buildChildrenFL(pwd, flat = false) {
    if (!pwd) {
      throw 'Please include the absolute path of the directory containing the docs you want to map.'
    }
    const rootPath = path.resolve(this.app.config.get('cms.folder'))
    const pwdPath = path.resolve(pwd)
    const pwdStat = fs.statSync(pwd)
    const files = fs.readdirSync(pwd)
    const output: {[key: string]: any} = {}
    let meta: {[key: string]: any} = {}
    let compiled

    // TODO Make it use latest series
    const possibleSeries = `${pwdPath}/series/a0/0.0.0`

    if (fs.existsSync(`${possibleSeries}.md`)) {
      meta = this.getMetaFL(`${possibleSeries}.md`)
    }

    if (fs.existsSync(`${possibleSeries}.html`)) {
      meta = this.getMetaFL(`${possibleSeries}.html`)
    }

    files.forEach(file => {

      const absolutePath = path.resolve(pwd, file)
      // const extName = path.extname(absolutePath)
      const stat = fs.statSync(absolutePath)
      // If this file is a directory, pass the directory to #buildChirldrenFL, saving the
      // results to output keyed by the directory name
      if (stat.isDirectory() && file !== this.app.config.get('cms.series') && file.charAt(0) !== ':') {
        output[file] = this.buildChildrenFL(absolutePath, flat)
      }


      // If this file is a markdown file, save the file contents to the output
      // object, keyed by the file name.
      // else if (stat.isFile() && extName === '.md') {
      //   output[file] = fs.readFileSync(absolutePath, 'utf8')
      // }
      //
      // else if (stat.isFile() && imageRegex.test(extName)) {
      //   output[file] = fs.readFileSync(absolutePath)
      // }

    })

    compiled = {
      // Fake id to mimic response from DB
      id: null,
      // The object key name
      key: this.pathToKey(pwdPath),
      // Link Title
      title: this.getTitleFL(meta.title, pwd),
      // Page Metadata
      meta: meta,
      // Link
      path: `/${ pwdPath.split(rootPath + '/')[1] || '' }`,
      // URL for sitemap
      url: `/${ pwdPath.split(rootPath + '/')[1] || '' }`,
      // Children of Link
      children: output,
      // Sitemap.xml lastmod
      lastmod: meta.lastmod || this.dateFormat(pwdStat.mtime),
      // Sitemap.xml changefreq
      changefreq: meta.changefreq || 'weekly',
      // Sitemap.xml priority
      priority: meta.priority || '0.5'
    }
    // let {children:c, ...rest} = compiled
    if (flat) {
      this.flat.push(_.omit(compiled, ['id', 'key', 'children', 'path', 'meta']))
    }

    return compiled
  }

  /**
   *
   * @param pwd {string}
   * @returns {string}
   */
  getTitleFL(title, pwd) {
    // TODO resolve actual title
    return title || path.basename(pwd)
  }

  /**
   *
   * @param pwd {string}
   * @returns {Object}
   */
  getMetaFL(pwd) {
    const doc = fs.readFileSync(pwd, 'utf8')
    const meta = this.app.services.RenderGenericService.renderSync(doc).meta || {}
    return meta
  }

  /**
   * Map Update to Sitemap
   * @param key {string}
   * @param payload {Object}
   * @returns {Object}
   */
  mapToSitemap(key, payload) {
    return _.set(this.app.cms.sitemap, key, payload)
  }

  /**
   * Get Sitemap entry from key
   * @param key {string}
   * @returns {Object}
   */
  keyToSitemap(key) {
    return _.get(this.app.cms.sitemap, key)
  }

  pathToKey(pwd) {
    const rootPath = path.resolve(this.app.config.get('cms.folder'))
    let key
    // pwd = pwd.replace(rootPath + '/', '') || ''
    pwd = pwd.split(rootPath + '/')[1] || ''
   // TODO make key from path
    pwd = pwd.split('/')
    if (pwd.length > 0) {
      key = 'children.' + pwd.join('.children.')
    }
    else {
      key = pwd.join('.children.')
    }
    if (key === 'children.') {
      key = ''
    }
    return key
  }
  /**
   *
   * @param date {string}
   * @returns {string}
   */
  dateFormat(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()
    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    return [year, month, day].join('-')
  }
}
