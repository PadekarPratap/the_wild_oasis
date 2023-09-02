import BookingsTable from "../components/BookingsTable";
import ErrorMessage from "../components/ErrorMessage";
import Spinner from "../components/Spinner";
import TableOperations from "../components/TableOperations";
import TableSort from "../components/TableSort";
import { useBookings } from "../hooks/bookings/useBookings";

const BookingOption = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "unconfirmed",
    label: "Unconfirmed",
  },
  {
    value: "checked-in",
    label: "Checked in",
  },
  {
    value: "checked-out",
    label: "Checked out",
  },
];

const BookingSortOptions = [
  {
    value: "total_price-asc",
    label: "Amount (lowest)",
  },
  {
    value: "total_price-desc",
    label: "Amount (highest)",
  },
  {
    value: "start_date-asc",
    label: "Date (recent)",
  },
  {
    value: "start_date-desc",
    label: "Date (earlier)",
  },
];

const Bookings = () => {
  const { isLoading, isError, error, bookings } = useBookings();

  return (
    <div>
      <div className="flex lg:items-center lg:justify-between flex-col lg:flex-row gap-5 lg:gap-0 items-start">
        <h1 className="text-2xl md:text-4xl tracking-wide font-semibold dark:text-white">
          Bookings
        </h1>

        {/* <p>Test/ filter / sort</p> */}
        <div className="flex flex-col gap-5 items-start lg:flex-row">
          <TableOperations fieldName="status" options={BookingOption} />
          <TableSort options={BookingSortOptions} />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="mt-10">
          <ErrorMessage message={error.message} />
        </div>
      ) : (
        <div className="mt-12">
          <BookingsTable bookings={bookings} />
        </div>
      )}
    </div>
  );
};
export default Bookings;
