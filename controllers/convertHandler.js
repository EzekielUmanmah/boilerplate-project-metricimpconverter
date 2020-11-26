/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  var units = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];

  const regex = /[a-z]+|[^a-z]+/gi;

  this.getNum = function(input) {
    let result;
    result = input.match(regex)[0];
    console.log('getNum() => ', result);
    //handle no number; before I tested if units.includes(result), which can potentially give the wrong error of 'invalid units and number'
    if(!/\d/.test(result)) return 1;
    //handle fractional number
    if(result.toString().includes('/')){
      let operands = result.toString().split('/');
      if(operands.length != 2 || isNaN(operands[0]) || isNaN(operands[1])) return 'invalid number';
      operands[0] = parseFloat(operands[0]);
      operands[1] = parseFloat(operands[1]);
      //the entire calculation (including toFixed()) goes inside parseFloat() to give the least amount of digits after the decimal
      result = parseFloat((operands[0]/operands[1]).toFixed(5));
    }
    //handle invalid number formats (e.g. double decimals)
    if(isNaN(result)) return 'invalid number';

    return result;

  };
  
  this.getUnit = function(input) {
    
    let result; 
    result = input.match(regex)[1];

    if(result === undefined){
      result = input.match(regex)[0]//.toLowerCase();
    }
    console.log('getUnit() => ',result);
    //a recurring theme is that I toLowerCase() units in statement conditions because one of the functional tests does not allow lower casing initUnit.
    if(!units.includes(result.toLowerCase())) return 'invalid unit';

    return result === 'l' || result === 'L' ? 
    result.toUpperCase() : 
    result.toLowerCase();
  };
  
  this.getReturnUnit = function(initUnit) {

    var result;
    //initUnit = initUnit.toLowerCase();
    let index = units.indexOf(initUnit);

    //not handling cases where unit does not match units[x] 

    if(index % 2 == 0){
      index++;
      result = units[index];
    }
    else {
      index--;
      result = units[index];
    }
    console.log('getReturnUnit() => ', result)
    return result === 'l' ? result.toUpperCase() : 
    result.toLowerCase();

  };

  this.spellOutUnit = function(unit, val) {
    var result;

    switch(unit.toLowerCase()){
      case 'GAL':
      case 'gal': result = val == 1 ? 'gallon':'gallons';
      break;
      case 'L':
      case 'l': result = val == 1 ? 'liter':'liters';
      break;
      case 'LBS':
      case 'lbs': result = val == 1 ? 'pound':'pounds';
      break;
      case 'KG':
      case 'kg': result = val == 1 ? 'kilogram':'kilograms';
      break;
      case 'MI':
      case 'mi': result = val == 1 ? 'mile':'miles';
      break;
      case 'KM':
      case 'km': result = val == 1 ? 'kilometer':'kilometers';
      default: null;
    }

    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    var result;

    switch(initUnit.toLowerCase()){
      case 'gal': result = (initNum * galToL)//.toFixed(5);
      break;
      case 'l': result = (initNum / galToL)//.toFixed(5);
      break;
      case 'lbs': result = (initNum * lbsToKg)//.toFixed(5);
      break;
      case 'kg': result = (initNum / lbsToKg)//.toFixed(5);
      break;
      case 'mi': result = (initNum * miToKm)//.toFixed(5);
      break;
      case 'km': result = (initNum / miToKm)//.toFixed(5);
      default: null;
    }
    
    return parseFloat(result.toFixed(5));
    //I had to apply toFixed(5) to the actual calculation because toFixed() turns the resulting number into a string (meaning I cannot simply append toFixed() to result); pass result to parseFloat() to return a type Number so that assert.approximately() tests are passed a type Number.
    //Or simply pass result.toFixed() to parseFloat(); the main thing is the type returned must be a Number.
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = {
      initNum: parseFloat(initNum), 
      initUnit,
      returnNum: parseFloat(returnNum), 
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(initUnit, initNum)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    };

    return result;
  };
  
}

module.exports = ConvertHandler;

