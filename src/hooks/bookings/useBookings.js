import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  // filter (Server Side)
  const filterValue = searchParams.get("status") || "all";
  const filter = { filterValue, value: "status" };

  // sort (Server Side)
  const sortValue = searchParams.get("sortBy") || "start_date-asc";
  const [sortField, sortDirection] = sortValue.split("-");
  const sort = { sortField, sortDirection };

  const {
    isLoading,
    isError,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["bookings", filter, sort],
    queryFn: () => getBookings({ filter, sort }),
  });

  return { isLoading, isError, error, bookings };
};
