import Button from "./Button";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-colorBrand50">
      <div className="max-w-screen-md bg-white w-full px-5 py-8 rounded-lg mx-4">
        <h1 className="text-center text-3xl font-bold">
          Something went wrong... Try again later?
        </h1>
        <p className="text-center text-gray-500 mt-4">{error.message}</p>
        <div className="text-center mt-5">
          <Button onClick={resetErrorBoundary} variant="primary">
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ErrorFallback;
