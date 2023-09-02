const SearchFilter = ({ name, setName }) => {
  return (
    <input
      className="w-72 px-4 py-2 border border-stone-500/30 rounded-md shadow outline-none focus-within:ring-2 focus-within:ring-colorBrand500 focus-within:ring-offset-1 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-800 dark:focus-within:ring-offset-0"
      type="text"
      placeholder="Search by Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};
export default SearchFilter;
