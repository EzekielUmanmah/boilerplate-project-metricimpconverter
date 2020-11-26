/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      let input = '1.5L';
      assert.equal(convertHandler.getNum(input), 1.5)
      done();
    });
    
    test('Fractional Input', function(done) {
      let input = '1/2mi';
      assert.equal(convertHandler.getNum(input), .5)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      let input = '27/5.4mi';
      assert.equal(convertHandler.getNum(input), 5)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      let input = '2//2mi';
      assert.equal(convertHandler.getNum(input), 'invalid number')
      done();
    });
    
    test('No Numerical Input', function(done) {
      let input = 'kg';
      assert.equal(convertHandler.getNum(input), 1)
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele, idx) {
        
        assert.equal(convertHandler.getUnit(5 + ele), 
        input[idx] === 'l' || input[idx] === 'L' ? 
        input[idx].toUpperCase() :
        input[idx].toLowerCase() );
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      var input    = 'sa';
      assert.equal(convertHandler.getUnit(5 + input), 'invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), 
        expect[i] === 'l' ?
        expect[i].toUpperCase() :
        expect[i] );
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['GALLON','LITER','MILE','KILOMETER','POUND','KILOGRAM'];
      var plural = ['GALLONS','LITERS','MILES','KILOMETERS','POUNDS','KILOGRAMS'];
      input.forEach( (ele, i) => {
        //test for singular unit by passing val = 1 as 2nd arg.
        assert.equal(convertHandler.spellOutUnit(ele,1), expect[i].toLowerCase());
        //test for plural unit by not passing val; val = undefined
        assert.equal(convertHandler.spellOutUnit(ele), plural[i].toLowerCase());
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.92705;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,
      0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.04670;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,
      0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,
      0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [5, 'lbs'];
      const expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,
      0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [5, 'kg'];
      const expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,
      0.1);
      done();
    });
    
  });

});


