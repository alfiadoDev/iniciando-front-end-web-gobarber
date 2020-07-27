import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export default function getValidationsErrors(err: ValidationError): Errors {
  const ValidationErrors: Errors = {};

  err.inner.map(error => {
    ValidationErrors[error.path] = error.message;
  });
  return ValidationErrors;
}
