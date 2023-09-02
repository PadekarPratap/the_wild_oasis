import { useForm } from "react-hook-form";
import Button from "./Button";
import FormControl from "./FormControl";
import { useUpdateUser } from "../hooks/auth/useUpdateUser";
import FormLoader from "./FormLoader";

const UpdatePasswordForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { updatingUser, updateUser } = useUpdateUser();

  const onPasswordSubmit = ({ password }) => {
    updateUser({ password });
  };

  return (
    <form onSubmit={handleSubmit(onPasswordSubmit)}>
      <FormControl
        label={"Password (min 8 chars)"}
        error={errors?.password?.message}
      >
        <input
          placeholder="**********"
          className="input-control"
          type="password"
          id="userPassword"
          {...register("password", {
            required: "This is a required field",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormControl>
      <FormControl
        label={"Confirm Password"}
        error={errors?.confirmPassword?.message}
      >
        <input
          placeholder="**********"
          className="input-control"
          type="password"
          id="c_Password"
          {...register("confirmPassword", {
            required: "This is a required field",
            validate: {
              matchPassword: (value) =>
                value === getValues().password || "Passwords do not match",
            },
          })}
        />
      </FormControl>

      <div className="flex justify-end items-center gap-2">
        <Button type="reset" variant="secondary">
          Cancel
        </Button>
        <Button variant="primary">
          {updatingUser ? (
            <>
              Updating Password <FormLoader />
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </div>
    </form>
  );
};
export default UpdatePasswordForm;
