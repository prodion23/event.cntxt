/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');

function Thing(req){
  return req.app.get('models').Thing;
}

// Get list of things
exports.index = function(req, res) {
  Thing(req)
    .findAll()
    .then(function (things) {
      return res.status(200).json(things);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Get a single thing
exports.show = function(req, res) {
  Thing(req)
    .findById(req.params.id)
    .then(function (thing) {
      if(!thing) { return res.status(404).send('Not Found'); }
      return res.json(thing);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Thing(req)
    .create(req.body)
    .then(function(thing) {
      return res.status(201).json(thing);
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Thing(req)
    .findById(req.params.id)
    .then(function (thing) {
      if(!thing) { return res.status(404).send('Not Found'); }
      var updated = _.merge(thing, req.body);
      updated.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(thing);
      });
    })
    .catch(function (err){
      if (err) { return handleError(res, err); }
    });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Thing(req)
    .findById(req.params.id)
    .then(function (thing) {
      if(!thing) { return res.status(404).send('Not Found'); }
      thing.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });
    })
    .catch(function (err){
      if(err) { return handleError(res, err); }
    });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
