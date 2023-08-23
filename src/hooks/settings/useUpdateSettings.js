import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: ({ updatedsettings, id }) =>
      updateSettingsApi(updatedsettings, id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings have been updated succesfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettings };
};
