const fetch = require('node-fetch');

async function addressDetailsOperation(args, callback) {
    try{
        const response = await fetch(`http://localhost:8000/address-details/${args.AddressDetailsInput.clientId}`);
        const jsonResponse = await response.json();
        if(response.ok){
            callback(null, {
              addressDetailsOutput: {
                  code: response.status,
                  response: {
                    ...jsonResponse,
                  },
                },
              })
        }else{
            callback(null, {
              addressDetailsOutput: {
                  code: response.status,
                },
              });
        }
    }catch(error){
        callback(error, {
          addressDetailsOutput: {
              code: 500,
            },
          });
    }
   
}

module.exports = { addressDetailsOperation };
