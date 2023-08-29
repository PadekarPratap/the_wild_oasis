import { useSearchParams } from "react-router-dom";

const TableOperations = ({ fieldName, options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get(fieldName);

  const handleChangeParams = (value) => {
    searchParams.set(fieldName, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex bg-white px-2 py-1 rounded-md gap-1 border border-stone-400/30 shadow">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChangeParams(option.value)}
          className={`px-4 py-1 rounded ${
            filterValue === option.value
              ? "bg-colorBrand500 text-slate-200"
              : ""
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
export default TableOperations;
