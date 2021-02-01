
const Joi = require('joi');
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const faker = require('faker/locale/en_GB');

const clientIdSchema = Joi.string().pattern(new RegExp('^12[0-9]{10}$')).message('Invalid Client Id').required();

module.exports = (app) => {
  app.get('/personal-details/:clientId', (req, res) => {
    const validationError = clientIdSchema.validate(req.params.clientId);
    const valid = validationError.error == null;
    if (!valid) {
      const { details } = validationError.error;
      const message = details.map((i) => i.message).join(',');
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message,
      });
    } else {
      res.status(StatusCodes.OK).json({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        title: faker.name.prefix(),
      });
    }
  });


  app.get('/address-details/:clientId', (req, res) => {
    const validationError = clientIdSchema.validate(req.params.clientId);
    const valid = validationError.error == null;
    if (!valid) {
      const { details } = validationError.error;
      const message = details.map((i) => i.message).join(',');
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message,
      });
    } else {
      res.status(StatusCodes.OK).json({
        address: faker.address.streetAddress(),
        county: faker.address.county(),
        postCode: faker.address.zipCode(),
        country: faker.address.country(),
      });
    }
  });


  app.get('/contact-details/:clientId', (req, res) => {
    const validationError = clientIdSchema.validate(req.params.clientId);
    const valid = validationError.error == null;
    if (!valid) {
      const { details } = validationError.error;
      const message = details.map((i) => i.message).join(',');
      res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
        status: StatusCodes.UNPROCESSABLE_ENTITY,
        message,
      });
    } else {
      res.status(StatusCodes.OK).json({
        phoneNumber: faker.phone.phoneNumber(),
        email: faker.internet.email(),
      });
    }
  });

  app.all('/', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({
      status: StatusCodes.NOT_FOUND,
      message: ReasonPhrases.NOT_FOUND,
    });
  });

  app.use((err, req, res) => {
    req.logger.error(err.stack);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      message: ReasonPhrases.INTERNAL_SERVER_ERROR,
    });
  });
};
