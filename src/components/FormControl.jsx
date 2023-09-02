const FormControl = ({ label, children, error }) => {
  return (
    <div className="mb-6 flex flex-col md:items-center md:flex-row gap-3 md:gap-5">
      <label
        className="lg:basis-[20%] md:basis-[25%] text-xl tracking-wide dark:text-white"
        htmlFor={children.props.id}
      >
        {label}
      </label>
      <div className="md:flex-grow flex flex-col gap-2">
        {children}
        {error && <small className="text-red-500 tracking-wide">{error}</small>}
      </div>
    </div>
  );
};
export default FormControl;
