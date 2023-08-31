import { useState } from "react";
import Button from "../components/shared/Button";
import FormControl from "../components/shared/FormControl";
import Logo from "../components/shared/Logo";
import useLogin from "../hooks/auth/useLogin";
import FormLoader from "./shared/FormLoader";

const LoginForm = () => {
  const [email, setEmail] = useState("pratap@gmail.com");
  const [password, setPassword] = useState("123");

  const { loggingIn, login } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    login({ email, password });
  };

  return (
    <div className="bg-gray-100 min-w-full min-h-screen flex items-center justify-center">
      {/* content wrapper  */}
      <div className="space-y-5">
        <Logo />
        <h1 className="text-center text-2xl font-bold text-gray-700">
          Log into your Account
        </h1>
        <div className="bg-white px-5 py-7 rounded-lg">
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
