'use strict';

import connection from './db.js';

let Profile = function (profile) {
  this.name = profile.name;
  this.age = profile.age;
  this.phone = profile.phone;
  this.email = profile.email;
  this.progile_img = profile.progile_img;
  this.portfolio_idx = profile.portfolio_idx;
};
// 모든 사용자 검색
Profile.findAll = function (result) {
  connection.query('Select * from profile', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('employees : ', res);
      result(null, res);
    }
  });
};
// 특정 사용자 검색
Profile.findById = function (id, result) {
  connection.query(
    'Select * from user where profile_idx = ? ',
    id,
    function (err, res) {
      if (err) {
        console.log('error: ', err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

export default Profile;
