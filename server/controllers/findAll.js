'use strict';
import { findAll } from '../model/profile-model.js';
import { findAll } from './profile-controller';

export function findAll(req, res) {
  findAll(function (err, user) {
    console.log('controller');
    if (err) res.send(err);
    console.log('res', user);
    res.send(user);
  });
}
