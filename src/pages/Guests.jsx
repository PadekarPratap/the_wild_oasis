import DataTable from "react-data-table-component";
import useGuests from "../hooks/guests/useGuests";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import SearchFilter from "../components/SearchFilter";
import { useState } from "react";

const guestColumns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    wrap: true,
  },
  {
    name: "Email",
    selector: (row) => row.email,
    sortable: true,
    wrap: true,
  },
  {
    name: "Nationality",
    selector: (row) => row.nationality,
    sortable: true,
  },
  {
    name: "national Id",
    selector: (row) => row.national_id,
    sortable: true,
  },
];

// eslint-disable-next-line
export const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
      "&:nth-child(2n)": {
        backgroundColor: "#f9fafb",
      },
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      fontSize: "1.3rem",
      textTransform: "capitalize",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "1rem",
      fontWeight: 500,
      color: "#374151",
    },
  },
};

const Guests = () => {
  const [name, setName] = useState("");
  const { isLoading, isError, guests, error } = useGuests(name);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl tracking-wide font-semibold dark:text-white">
          Guests
        </h1>

        {/* <p>Sort / filter </p> */}
        <SearchFilter name={name} setName={setName} />
      </div>

      {/* guest data table  */}
      <div className="mt-12">
        {isLoading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : isError ? (
          <ErrorMessage message={error.message} />
        ) : (
          <div className="border border-stone-500/20 rounded-lg shadow">
            <DataTable
              columns={guestColumns}
              data={guests}
              customStyles={customStyles}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Guests;
