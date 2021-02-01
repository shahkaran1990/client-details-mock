const fetch = require('node-fetch');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

async function personalDetailsOperation(args, callback) {
  try {
    const response = await fetch(`http://localhost:8000/personal-details/${args.PersonalDetailsInput.clientId}`);
    const jsonResponse = await response.json();
    if (response.ok) {
      callback(null, {
        personalDetailsOutput: {
          code: response.status,
          response: {
            ...jsonResponse,
          },
        },
      });
    } else {
      callback(null, {
        personalDetailsOutput: {
          code: response.status,
          msg: jsonResponse.message,
        },
      });
    }
  } catch (error) {
    callback(error, {
      contactDetailsOutput: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

module.exports = { personalDetailsOperation };
