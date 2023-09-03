import { useBookingsAfterDate } from "../hooks/bookings/useBookingsAfterDate";
import { useStays } from "../hooks/bookings/useStays";
import Stats from "./Stats";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "../utils/helper";
import SalesChart from "./SalesChart";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

const DashboardLayout = () => {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 7;

  const { isLoading, isError, error, bookingsAfterDate } =
    useBookingsAfterDate();

  const {
    isError: stayIsError,
    isLoading: stayLoading,
    error: stayError,
    confirmedStays,
  } = useStays();

  const sales = bookingsAfterDate?.reduce(
    (acc, curr) => acc + curr.total_price,
    0
  );

  const checkIns = confirmedStays?.length;

  const occupancyRate = ((checkIns / bookingsAfterDate?.length) * 100).toFixed(
    0
  );

  const allDate = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const salesData = allDate.map((date) => {
    return {
      label: format(new Date(date), "MMM dd"),
      sales:
        bookingsAfterDate
          ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
          ?.reduce((acc, curr) => acc + curr.total_price, 0) || 0,
    };
  });

  console.log(salesData);

  return (
    <>
      {isLoading || stayLoading ? (
        <div className="mt-16 flex justify-center">
          <Spinner />
        </div>
      ) : isError || stayIsError ? (
        <div className="mt-12">
          <ErrorMessage message={error.message || stayError.message} />
        </div>
      ) : (
        <div className="mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Stats
              bgColor="bg-blue-300"
              textColor="text-blue-800"
              title="Bookings"
              value={bookingsAfterDate?.length}
              icon={<HiOutlineBriefcase size={35} />}
            />
            <Stats
              bgColor="bg-green-300"
              textColor="text-green-800"
              title="Sales"
              value={formatCurrency(sales)}
              icon={<HiOutlineBanknotes size={35} />}
            />
            <Stats
              bgColor="bg-purple-300"
              textColor="text-purple-800"
              title="Check Ins"
              value={checkIns}
              icon={<HiOutlineCalendarDays size={35} />}
            />
            <Stats
              bgColor="bg-yellow-300"
              textColor="text-yellow-800"
              title="Occupancy Rate"
              value={`${occupancyRate} %`}
              icon={<HiOutlineChartBar size={35} />}
            />
          </div>

          <SalesChart data={salesData} />
        </div>
      )}
    </>
  );
};
export default DashboardLayout;
