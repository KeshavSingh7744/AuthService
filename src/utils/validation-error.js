const AppError = require('./error-handler');
const {StatusCodes} = require('http-status-codes');

class ValidationError extends AppError {
  constructor(error) {
        super(
            error.name,
            error.message,
            error.description,
            StatusCodes.BAD_REQUEST,
        )
  }
}

module.exports = ValidationError;




