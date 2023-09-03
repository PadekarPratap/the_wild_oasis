import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../services/apiBooking";
import { useSearchParams } from "react-router-dom";
import moment from "moment";

export const useStays = () => {
  const [searchParams] = useSearchParams();

  const numDays = Number(searchParams.get("last")) || 7;

  const queryDate = moment().subtract(numDays, "days").toISOString();

  const {
    isError,
    isLoading,
    error,
    data: stays,
  } = useQuery({
    queryKey: ["stays", numDays],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isError, isLoading, error, confirmedStays };
};
