import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const navigate = useNavigate();

  const { isLoading: loggingIn, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    onSuccess: () => {
      toast.success("Login successfull");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { loggingIn, login };
};
export default useLogin;
