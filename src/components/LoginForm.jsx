import { useState } from "react";
import Button from "../components/Button";
import FormControl from "../components/FormControl";
import Logo from "../components/Logo";
import useLogin from "../hooks/auth/useLogin";
import FormLoader from "./FormLoader";
import { useQueryClient } from "@tanstack/react-query";

const LoginForm = () => {
  const [email, setEmail] = useState("pratap@gmail.com");
  const [password, setPassword] = useState("123");

  const { loggingIn, login } = useLogin();

  const queryClient = useQueryClient();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: (data) => {
          console.log(data);
          queryClient.setQueryData(["user"], data);
        },
      }
    );
  };

  return (
    <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center dark:bg-slate-900">
      {/* content wrapper  */}
      <div className="space-y-5">
        <Logo />
        <h1 className="text-center text-2xl font-bold text-gray-700 dark:text-gray-300">
          Log into your Account
        </h1>
        <div className="bg-white px-5 py-7 rounded-lg dark:bg-slate-700">
          <form onSubmit={handleSubmit}>
            <FormControl label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-control"
                placeholder="Email"
                type="email"
                id="email"
              />
            </FormControl>
            <FormControl label="Password">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input-control"
                type="password"
                id="password"
              />
            </FormControl>

            <div className="text-center">
              <Button disabled={loggingIn} variant="primary">
                {loggingIn ? (
                  <>
                    Loggin in <FormLoader />
                  </>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
