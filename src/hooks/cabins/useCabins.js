import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";

export const useCabins = () => {
  const {
    data: cabins,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { isLoading, isError, error, cabins };
};
