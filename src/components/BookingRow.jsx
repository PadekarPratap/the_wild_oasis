// currently muted due to the use of react data table component
import { TimeAgo, formatCurrency, formatDate } from "../utils/helper";
import BookingStatus from "./BookingStatus";
import Table from "./Table";

const BookingRow = ({ booking }) => {
  console.log(booking);
  const { guest, cabin } = booking;
  return (
    <Table.Row>
      <Table.DataCell data="Cabin :">{cabin.cabin_name}</Table.DataCell>
      <Table.DataCell data="Guest :">
        <div className="flex flex-col">
          <span>{guest.name}</span>
          <span className="text-gray-500">{guest.email}</span>
        </div>
      </Table.DataCell>
      <Table.DataCell data="Dates :">
        <div className="flex flex-col">
          <span>
            {TimeAgo(booking.start_date)} &rarr; {booking.no_of_nights} nights
            stay
          </span>
          <span className="text-gray-500">
            {formatDate(booking.start_date)} - {formatDate(booking.end_date)}
          </span>
        </div>
      </Table.DataCell>
      <Table.DataCell data="Status :">
        <div>
          <BookingStatus value={booking.status} />
        </div>
      </Table.DataCell>
      <Table.DataCell data="Amount :">
        <span
          className={`font-sono ${
            booking.is_paid ? "text-green-500" : "text-red-500"
          }`}
        >
          {formatCurrency(booking.total_price)}
        </span>
      </Table.DataCell>
      <Table.DataCell data="# :">Operation options</Table.DataCell>
    </Table.Row>
  );
};
export default BookingRow;
