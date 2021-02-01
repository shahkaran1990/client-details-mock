const fetch = require('node-fetch');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');

async function addressDetailsOperation(args, callback) {
  try {
    const response = await fetch(
      `http://localhost:8000/address-details/${args.AddressDetailsInput.clientId}`,
    );
    const jsonResponse = await response.json();
    if (response.ok) {
      callback(null, {
        addressDetailsOutput: {
          code: response.status,
          response: {
            ...jsonResponse,
          },
        },
      });
    } else {
      callback(null, {
        addressDetailsOutput: {
          code: response.status,
          msg: jsonResponse.message,
        },
      });
    }
  } catch (error) {
    callback(error, {
      addressDetailsOutput: {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

module.exports = { addressDetailsOperation };
