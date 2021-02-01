const { personalDetailsOperation } = require('./personalDetailsOperation');

module.exports = () => ({
  PersonalDetailsWebservice: {
    PersonalDetailsWebservice: {
      personalDetails(args, callback) {
        personalDetailsOperation(args, (err, result) => {
          callback(err, result);
        });
      },
    },
  },
});
