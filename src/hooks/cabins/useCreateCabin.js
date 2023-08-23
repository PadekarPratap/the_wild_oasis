import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin as createCabinApi } from "../../services/apiCabin";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: (newCabin) => createCabinApi(newCabin),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      console.log(data);
      toast.success(`${data[0].cabin_name} Cabin created successfully!`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
};
