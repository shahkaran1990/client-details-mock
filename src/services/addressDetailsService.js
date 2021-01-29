const { addressDetailsOperation } = require('./addressDetailsOperation');

module.exports = () => ({
  AddressDetailsWebservice: {
    AddressDetailsWebservice: {
      addressDetails(args, callback) {
        addressDetailsOperation(args,  (err, result) => {
          callback(err, result);
        });
      },
    },
  },
});
