import React from 'react';

interface ErrorAlertProps {
  errorType: string;
  errorDescription: string;
}
const ErrorAlert = ({ errorType, errorDescription }: ErrorAlertProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-2"
      role="alert"
    >
      <strong className="font-bold mr-2">{errorDescription}</strong>
      {/* <span className="block sm:inline">{errorDescription}</span> */}
    </div>
  );
};

export default ErrorAlert;
