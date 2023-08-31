import { MdArrowBackIosNew, MdOutlineNavigateNext } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

export const PAGE_SIZE = 5;

const TablePagination = ({ count }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const previousPage = () => {
    const page = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const nextPage = () => {
    const page = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center justify-between p-5">
      <p>
        showing{" "}
        <span className="font-bold">{(currentPage - 1) * PAGE_SIZE + 1}</span>{" "}
        to{" "}
        <span className="font-bold">
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-bold">{count}</span> results
      </p>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={previousPage}
          className="disabled:opacity-50 disabled:cursor-not-allowed group inline-flex items-center gap-3 hover:bg-colorBrand500 hover:text-white px-4 py-2 rounded-lg"
        >
          <MdArrowBackIosNew className="group-hover:text-white" size={20} />{" "}
          <span>Previous</span>
        </button>

        <button
          disabled={currentPage === pageCount}
          onClick={nextPage}
          className="disabled:opacity-50 disabled:cursor-not-allowed group inline-flex items-center gap-3 hover:bg-colorBrand500 hover:text-white px-4 py-2 rounded-lg"
        >
          <span>Next</span>{" "}
          <MdOutlineNavigateNext className="group-hover:text-white" size={20} />
        </button>
      </div>
    </div>
  );
};
export default TablePagination;
