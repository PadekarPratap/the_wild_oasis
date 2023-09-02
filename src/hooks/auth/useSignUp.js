import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export const useSignUp = () => {
  const { isLoading: creatingUser, mutate: signUp } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpApi(email, password, fullName),
    onSuccess: () => {
      toast.success(
        "User created successfully. Please verify you email address to log in."
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { creatingUser, signUp };
};
