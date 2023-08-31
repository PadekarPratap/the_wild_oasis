import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabin";
import { useSearchParams } from "react-router-dom";

export const useCabins = () => {
  const queryClient = useQueryClient();

  // pagination
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cabins", page],
    queryFn: () => getCabins(page),
  });

  // PREFETCHING the next page
  queryClient.prefetchQuery({
    queryKey: ["cabins", page + 1],
    queryFn: () => getCabins(page),
  });

  const { data: cabins, count } = data;

  return { isLoading, isError, error, cabins, count };
};
