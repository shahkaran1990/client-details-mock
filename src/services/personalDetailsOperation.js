const fetch = require('node-fetch');

async function personalDetailsOperation(args, callback) {
    try{
      console.log(args);
        const response = await fetch(`http://localhost:8000/personal-details/${args.PersonalDetailsInput.clientId}`);
        const jsonResponse = await response.json();
        if(response.ok){
            callback(null, {
              personalDetailsOutput: {
                  code: response.status,
                  response: {
                    ...jsonResponse,
                  },
                },
              })
        }else{
            callback(null, {
              personalDetailsOutput: {
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

module.exports = { personalDetailsOperation };
