import { useSearchParams } from "react-router-dom";

const TableSort = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="px-3 py-2 border border-stone-400/30 shadow rounded-md focus-within:outline-colorBrand500 dark:bg-slate-700 dark:text-white"
      onChange={handleChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
export default TableSort;
