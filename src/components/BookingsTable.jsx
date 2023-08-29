import BookingRow from "./BookingRow";
import Table from "./shared/table/Table";

const BookingsTable = ({ bookings }) => {
  console.log(bookings);

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <Table>
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
      </Table>
    </div>
  );
};

export default BookingsTable;
