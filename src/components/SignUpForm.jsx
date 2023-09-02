import { useForm } from "react-hook-form";
import Button from "./Button";
import FormControl from "./FormControl";
import { useSignUp } from "../hooks/auth/useSignUp";
import FormLoader from "./FormLoader";

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const SignUpForm = () => {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { creatingUser, signUp } = useSignUp();

  const onFormSubmit = ({ email, password, fullName }) => {
    signUp(
      { email, password, fullName },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <div className="mt-20">
      <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
        <FormControl label="Full Name" error={errors?.fullName?.message}>
          <input
            {...register("fullName", {
              required: "This is a required field",
            })}
            className="input-control"
            type="text"
            id="name"
            placeholder="username"
          />
        </FormControl>
        <FormControl label="Email" error={errors?.email?.message}>
          <input
            {...register("email", {
              required: "This is a required field",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email",
              },
            })}
            className="input-control"
            type="email"
            id="email"
            placeholder="user@gmail.com"
          />
        </FormControl>
        <FormControl
          label="Password (min 8 characters)"
          error={errors?.password?.message}
        >
          <input
            {...register("password", {
              required: "This is a required field",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className="input-control"
            type="password"
            id="password"
            placeholder="**********"
          />
        </FormControl>
        <FormControl
          label="Confirm Password"
          error={errors?.confirmPassword?.message}
        >
          <input
            {...register("confirmPassword", {
              required: "This is a required field",
              validate: {
                matchPassword: (value) =>
                  value === getValues().password || "Passwords do not match",
              },
            })}
            className="input-control"
            type="password"
            id="confirm-password"
            placeholder="**********"
          />
        </FormControl>

        <div className="flex justify-end items-center gap-5">
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
          <Button variant="primary">
            {creatingUser ? (
              <>
                Creating User <FormLoader />
              </>
            ) : (
              "Create User"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignUpForm;
