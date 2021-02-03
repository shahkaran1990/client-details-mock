# Cient Detais Mock
This is a mock service created to support a BPM casestudy assigned to new BPM developers for hands-on. Details about the case study can be found [here](https://confluence.core.awscmg-dev.dwpcloud.uk/x/ZYWlAQ)

The service is created using NodeJs with [faker](https://www.npmjs.com/package/faker) to create fake data.

#### Containerizing
To build a container image run
`docker build . -t client-details-mock:latest` in the root directory.

On execution of the above command a docker image of the microservice would be created and can be ran independently as a container.

#### Run locally
Install dependencies running `npm i`

Start the service on port `8000` run 

`npm run start`

Start the service on custom port run 

`PORT=XXXX npm run start`

Start the service in development mode wit nodemon enabled

`npm run dev`
