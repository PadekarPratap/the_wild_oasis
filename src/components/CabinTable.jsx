import { useSearchParams } from "react-router-dom";
import AddCabinForm from "./AddCabinForm";
import CabinRow from "./CabinRow";
import ErrorMessage from "./shared/ErrorMessage";
import Spinner from "./shared/Spinner";
import Table from "./shared/table/Table";
import TablePagination from "./shared/TablePagination";

const CabinTable = ({ isLoading, isError, cabins, error, count }) => {
  const [searchParams] = useSearchParams();

  // 1) filteration of Data (client side)
  const filteredValue = searchParams.get("discount") || "all";
  let filteredCabins;
  if (filteredValue === "all") filteredCabins = cabins;

  if (filteredValue === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);

  if (filteredValue === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) Sorting of Data (client side)
  const sortValue = searchParams.get("sortBy") || "created_at-asc";
  const [value, sortStyle] = sortValue.split("-");
  const modifier = sortStyle === "asc" ? 1 : -1;
  const sortedCabins =
    value === "cabin_name"
      ? filteredCabins
          ?.slice()
          .sort((a, b) =>
            modifier === 1
              ? a[value].localeCompare(b[value])
              : b[value].localeCompare(a[value])
          )
      : filteredCabins
          ?.slice()
          .sort((a, b) => (a[value] - b[value]) * modifier);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Table>
              <Table.Head>
                <Table.HeaderRow>
                  <Table.HeaderCell width="w-[10%]">Image</Table.HeaderCell>
                  <Table.HeaderCell width="w-[55%]">Name</Table.HeaderCell>
                  <Table.HeaderCell width="w-[10%]">
                    Max Capacity
                  </Table.HeaderCell>
                  <Table.HeaderCell width="w-[10%]">Price</Table.HeaderCell>
                  <Table.HeaderCell width="w-[10%]">Discount</Table.HeaderCell>
                  <Table.HeaderCell width="w-[5%]"></Table.HeaderCell>
                </Table.HeaderRow>
              </Table.Head>

              <Table.Body>
                {sortedCabins?.map((cabin) => (
                  <CabinRow key={cabin.id} cabin={cabin} />
                ))}
              </Table.Body>
            </Table>
            <TablePagination count={count} />
          </div>
          <AddCabinForm />
        </>
      )}
    </>
  );
};
export default CabinTable;
