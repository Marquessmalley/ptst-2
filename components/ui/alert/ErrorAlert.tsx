import React from "react";

interface ErrorAlertProps {
  errorType: string;
  errorDescription: string;
}
const ErrorAlert = ({ errorType, errorDescription }: ErrorAlertProps) => {
  return (
    <div
      className="relative mb-2 rounded border border-red-400 bg-red-100 px-4 py-3 text-center text-red-700"
      role="alert"
    >
      <strong className="mr-2 font-bold">{errorDescription}</strong>
      {/* <span className="block sm:inline">{errorDescription}</span> */}
    </div>
  );
};

export default ErrorAlert;
