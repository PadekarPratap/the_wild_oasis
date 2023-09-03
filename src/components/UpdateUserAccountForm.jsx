import { useForm } from "react-hook-form";
import { useUser } from "../hooks/auth/useUser";
import UpdatePasswordForm from "./UpdatePasswordForm";
import Button from "./Button";
import FormControl from "./FormControl";
import Spinner from "./Spinner";
import { useUpdateUser } from "../hooks/auth/useUpdateUser";
import FormLoader from "./FormLoader";

const UpdateUserAccountForm = () => {
  const { user, isLoading } = useUser();

  const { register, handleSubmit } = useForm();
  const { updatingUser, updateUser } = useUpdateUser();

  const onSubmit = ({ fullName, avatar }) => {
    if (!fullName) return null;
    updateUser({ fullName, avatar });
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white px-4 py-3 rounded-lg dark:bg-slate-800"
            >
              <FormControl label="Email">
                <input
                  id="userEmail"
                  type="email"
                  className="input-control disabled:cursor-not-allowed"
                  defaultValue={user.user.email}
                  disabled
                />
              </FormControl>

              <FormControl label="Full Name">
                <input
                  type="text"
                  id="userFullName"
                  className="input-control"
                  defaultValue={user.user.user_metadata.fullName}
                  {...register("fullName")}
                />
              </FormControl>

              <FormControl label="User Avatar">
                <input
                  className="input-control file:bg-colorBrand600 file:text-white file:border-none file:px-3 file:py-2 file:cursor-pointer file: file:rounded-lg focus-within:ring-0"
                  type="file"
                  id="userAvatar"
                  {...register("avatar")}
                />
              </FormControl>

              <div className="flex justify-end gap-2">
                <Button type="reset" variant="secondary">
                  Cancel
                </Button>
                <Button variant="primary">
                  {updatingUser ? (
                    <>
                      Updating user <FormLoader />
                    </>
                  ) : (
                    "Update User"
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* update password  */}
          <div className="mt-8">
            {/* update password form  */}
            <UpdatePasswordForm />
          </div>
        </>
      )}
    </>
  );
};
export default UpdateUserAccountForm;
