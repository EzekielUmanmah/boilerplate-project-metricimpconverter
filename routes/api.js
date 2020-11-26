/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){

      var input = req.query.input;
      if(!input) return res.send('invalid unit')

      var initNum = convertHandler.getNum(input);
      console.log('initNum',initNum)

      var initUnit = convertHandler.getUnit(input);
      console.log('initUnit',initUnit)

      if(initNum == 'invalid number' && initUnit == 'invalid unit') {
        return res.send('invalid number and unit');
      }
      if(initNum == 'invalid number') {
        return res.send('invalid number');
      }
      if(initUnit == 'invalid unit') {
        return res.send('invalid unit');
      }

      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

      res.json(toString)

    });
    
};
