import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export const useGuests = (name) => {
  const {
    isLoading,
    isError,
    error,
    data: guests,
  } = useQuery({
    queryKey: ["guests", name],
    queryFn: () => getGuests(name),
  });

  return { isError, isLoading, error, guests };
};
export default useGuests;
