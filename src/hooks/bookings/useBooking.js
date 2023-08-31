import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBooking";
import { useParams } from "react-router-dom";

export const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    error,
    isError,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isLoading, isError, error, booking };
};
