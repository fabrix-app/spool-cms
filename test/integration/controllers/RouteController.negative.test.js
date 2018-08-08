'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')

describe('RouteController', () => {
  let request

  before((done) => {
    request = supertest('http://localhost:3000')
    done()
  })
  it('should make addPage post request and fail validation', (done) => {
    request
      .post('/route/addPage',{})
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })
  it('should fail addPage post request as it is created', (done) => {
    request
      .post('/route/addPage')
      .send({
        identifier: '/hello/:world'
      })
      .expect(400) // TODO Used to be a 409
      .end((err, res) => {
        assert.equal(res.text, '/hello/:world is already created, use RouterController.editPage or RouterService.editPage instead')
        done(err)
      })
  })
  it('should fail editPage post request as it does not exists', (done) => {
    request
      .post('/route/editPage')
      .send({
        identifier: '/hello/mercury',
        options: {}
      })
      .expect(404)
      .end((err, res) => {
        assert.equal(res.text, '/hello/mercury does not exist and can not be updated')
        done(err)
      })
  })
  it('should make addSeries post request and fail validation', (done) => {
    request
      .post('/route/addSeries')
      .send({})
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })
  it('should make editSeries post request and fail validation', (done) => {
    request
      .post('/route/editSeries')
      .send({})
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })
  it('should make removeSeries post request and fail validation', (done) => {
    request
      .post('/route/removeSeries')
      .send({})
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })
  it('should make positive control post request and fail validation', (done) => {
    request
      .post('/route/control?type=positive')
      .send({})
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })
  it('should make negative control post request and fail validation', (done) => {
    request
      .post('/route/control?type=negative')
      .send({})
      .expect(400)
      .end((err, res) => {
        done(err)
      })
  })
})
