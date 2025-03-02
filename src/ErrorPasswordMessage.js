import React from "react";

const ErrorPasswordMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};

export default ErrorPasswordMessage;
