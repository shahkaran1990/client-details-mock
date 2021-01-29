const fetch = require('node-fetch');

async function contactDetailsOperation(args, callback) {
    try{
        const response = await fetch(`http://localhost:8000/contact-details/${args.ContactDetailsInput.clientId}`);
        const jsonResponse = await response.json();
        if(response.ok){
            callback(null, {
              contactDetailsOutput: {
                  code: response.status,
                  response: {
                    ...jsonResponse,
                  },
                },
              })
        }else{
            callback(null, {
              contactDetailsOutput: {
                  code: response.status,
                },
              });
        }
    }catch(error){
        callback(error, {
          contactDetailsOutput: {
              code: 500,
            },
          });
    }
   
}

module.exports = { contactDetailsOperation };
