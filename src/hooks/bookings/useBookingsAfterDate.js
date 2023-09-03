import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate as getBookingsAfterDateApi } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

export const useBookingsAfterDate = () => {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 7;

  const queryDate = moment().subtract(numDays, "days").toISOString();

  const {
    isLoading,
    error,
    data: bookingsAfterDate,
    isError,
  } = useQuery({
    queryKey: ["bookingsAfterDate", numDays],
    queryFn: () => getBookingsAfterDateApi(queryDate),
  });

  return { isLoading, isError, error, bookingsAfterDate };
};
