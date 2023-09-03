import DataTable from "react-data-table-component";
// import BookingRow from "./BookingRow";
// import Table from "./Table";
import BookingsGuestNameCell from "./BookingsGuestNameCell";
import BookingDatesCell from "./BookingDatesCell";
import BookingStatus from "./BookingStatus";
import { formatCurrency } from "../utils/helper";
import { customStyles } from "../pages/Guests";
import BookingsTableOptions from "./BookingsTableOptions";
// import { useTheme } from "../hooks/useTheme";

const bookingColumns = [
  {
    name: "Cabin",
    selector: (row) => row.cabin.cabin_name,
    sortable: true,
    wrap: true,
  },
  {
    name: "Guest",
    selector: (row) => <BookingsGuestNameCell row={row} />,
    wrap: true,
  },
  {
    name: "Dates",
    selector: (row) => <BookingDatesCell row={row} />,
    wrap: true,
  },
  {
    name: "Status",
    selector: (row) => <BookingStatus value={row.status} />,
  },
  {
    name: "Amount",
    selector: (row) => formatCurrency(row.total_price),
    style: {
      color: "green",
    },
    sortable: true,
    wrap: true,
  },
  {
    name: "",
    selector: (row) => <BookingsTableOptions row={row} />,
    center: true,
    width: "150px",
  },
];

const BookingsTable = ({ bookings }) => {
  // console.log(bookings);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* <Table>
        <Table.Head>
          <Table.HeaderRow>
            <Table.HeaderCell width="w-[20%]">Cabin</Table.HeaderCell>
            <Table.HeaderCell width="w-[20%]">Guest</Table.HeaderCell>
            <Table.HeaderCell width="w-[30%]">Dates</Table.HeaderCell>
            <Table.HeaderCell width="w-[15%]">Status</Table.HeaderCell>
            <Table.HeaderCell width="w-[10%]">Amount</Table.HeaderCell>
            <Table.HeaderCell width="w-[5%]"></Table.HeaderCell>
          </Table.HeaderRow>
        </Table.Head>

        <Table.Body>
          {bookings?.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </Table.Body>
      </Table> */}

      <DataTable
        columns={bookingColumns}
        data={bookings}
        customStyles={customStyles}
        pagination
      />
    </div>
  );
};

export default BookingsTable;
