import SignUpForm from "../components/SignUpForm";

const CreateUser = () => {
  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-4xl tracking-wide font-semibold dark:text-white">
          Create a new user
        </h1>
      </div>

      <SignUpForm />
    </div>
  );
};
export default CreateUser;
