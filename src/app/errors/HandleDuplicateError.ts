import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HandleDuplicateError = (err: any): TGenericErrorResponse => {
  let extractedField = '';
  let extractedValue = '';

  // Check if Mongo provides keyPattern and keyValue (more reliable than parsing errmsg)
  if (err?.keyPattern && err?.keyValue) {
    extractedField = Object.keys(err.keyPattern)[0]; // e.g., "owner_id"
    extractedValue = String(Object.values(err.keyValue)[0]); // e.g., ObjectId("...")
  } else {
    // fallback: regex parsing (for old versions of MongoDB error messages)
    const match = err.message.match(/dup key: { (.*) }/);
    if (match && match[1]) {
      const parts = match[1].split(':');
      extractedField = parts[0].trim();
      extractedValue = parts[1]?.trim();
    }
  }

  const errorSources: TErrorSources = [
    {
      path: extractedField,
      message: `'${extractedValue}' for '${extractedField}' already exists`,
    },
  ];

  return {
    statusCode: 400,
    message: 'Duplicate Key Error',
    errorSources,
  };
};

export default HandleDuplicateError;
