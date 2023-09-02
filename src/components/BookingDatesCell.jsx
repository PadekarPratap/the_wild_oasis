import { TimeAgo, formatDate } from "../utils/helper";

const BookingDatesCell = ({ row }) => {
  return (
    <div className="flex flex-col">
      <span>
        {TimeAgo(row.start_date)} &rarr; {row.no_of_nights} nights stay
      </span>
      <span className="text-gray-500">
        {formatDate(row.start_date)} - {formatDate(row.end_date)}
      </span>
    </div>
  );
};
export default BookingDatesCell;
