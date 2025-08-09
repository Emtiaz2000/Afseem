import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleDuplicateError = (err: any): TGenericErrorResponse => {
  // extract value from double quotes with using regex
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1]; // find the value in index-1

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `'${extractedMessage}' is already exists`,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid Request',
    errorSources,
  };
};

export default HandleDuplicateError;
