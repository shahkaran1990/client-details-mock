const { contactDetailsOperation } = require('./contactDetailsOperation');

module.exports = () => ({
  ContactDetailsWebservice: {
    ContactDetailsWebservice: {
      contactDetails(args, callback) {
        contactDetailsOperation(args, (err, result) => {
          callback(err, result);
        });
      },
    },
  },
});
