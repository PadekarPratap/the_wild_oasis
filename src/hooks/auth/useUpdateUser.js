import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { isLoading: updatingUser, mutate: updateUser } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateUserApi({ fullName, avatar, password }),
    onSuccess: () => {
      toast.success("User updated successfully!");
      queryClient.invalidateQueries(["user"]);
    },
  });

  return { updatingUser, updateUser };
};
