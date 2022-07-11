'use strict';
import Profile from '../model/profile-model.js';

export function findAll(req, res) {
  Profile.findAll(function (err, user) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', user);
    res.send(user);
  });
}

export function findById(req, res) {
  Profile.findById(req.params.id, function (err, user) {
    if (err) res.send(err);
    res.json(user);
  });
}
