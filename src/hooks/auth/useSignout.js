import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export const useSignout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: signingOut, mutate: signout } = useMutation({
    mutationFn: () => signOut(),
    onSuccess: () => {
      toast.success("Signout successfull");
      navigate("/login", { replace: true });
      queryClient.removeQueries();
    },
  });

  return { signingOut, signout };
};
