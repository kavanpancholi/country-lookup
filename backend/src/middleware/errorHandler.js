import { errorResponse } from '../helpers';

const errorHandler = (err, req, res) => {
  if (err && err.message === 'validation error') {
    const messages = err.errors.map(e => e.messages);
    return errorResponse(req, res, messages.join(', '), 400, err);
  }
  return errorResponse(req, res);
};

export default errorHandler;
