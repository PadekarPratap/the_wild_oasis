import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCabin } from "../../services/apiCabin";
import { toast } from "react-hot-toast";

export const useUpdateCabin = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ updatedCabin, id }) => editCabin(updatedCabin, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin has been edited successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  return { isUpdating, updateCabin };
};
