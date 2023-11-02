const schema = require('./dataSchema.json');
const tv4 = require('tv4');

module.exports = function(data) {

    const isValid = tv4.validate(data, schema);

    if (!isValid) {
        console.log(tv4.error.message);
    }

    return isValid;

}
