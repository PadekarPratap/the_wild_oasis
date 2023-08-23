const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-600 border border-red-600 rounded-md px-4 py-2">
      {message}
    </div>
  );
};
export default ErrorMessage;
