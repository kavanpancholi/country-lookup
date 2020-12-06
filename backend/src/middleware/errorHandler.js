import { errorResponse } from '../helpers';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err && err.message === 'validation error') {
    const messages = err.errors.map(e => e.messages);
    return errorResponse(req, res, messages.join(', '), 400, err.errors);
  }
  return errorResponse(req, res);
};

export default errorHandler;
