import CabinTable from "../components/CabinTable";
import TableOperations from "../components/shared/TableOperations";
import TableSort from "../components/shared/TableSort";
import { useCabins } from "../hooks/cabins/useCabins";

const filterOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "No Discount",
    value: "no-discount",
  },
  {
    label: "With Discount",
    value: "with-discount",
  },
];

const sortOptions = [
  {
    label: "Sort by Name (asc)",
    value: "cabin_name-asc",
  },
  {
    label: "Sort by Name (desc)",
    value: "cabin_name-desc",
  },
  {
    label: "Sort by Price (lowest)",
    value: "regular_price-asc",
  },
  {
    label: "Sort by Price (highest)",
    value: "regular_price-desc",
  },
  {
    label: "Sort by Capacity (lowset)",
    value: "max_capacity-asc",
  },
  {
    label: "Sort by Capacity (highest)",
    value: "max_capacity-desc",
  },
];

const Cabins = () => {
  const { isError, isLoading, cabins, error, count } = useCabins();
  return (
    <div>
      <div className="flex lg:items-center lg:justify-between mb-12 flex-col lg:flex-row items-start gap-4 lg:gap-0">
        <h1 className="text-2xl md:text-4xl tracking-wide font-semibold">
          Cabins
        </h1>
        {/* <p>Filter / sort</p> */}
        <div className="space-y-4 md:space-y-0 md:gap-4 md:flex items-center">
          <TableOperations fieldName="discount" options={filterOptions} />
          <TableSort options={sortOptions} />
        </div>
      </div>

      {/* table  */}
      <CabinTable
        cabins={cabins}
        isLoading={isLoading}
        isError={isError}
        error={error}
        count={count}
      />
    </div>
  );
};
export default Cabins;
