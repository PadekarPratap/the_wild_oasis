import { useUser } from "../hooks/auth/useUser";

const Avatar = () => {
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.user?.user_metadata?.avatar || "/default-user.jpg"}
        alt="user avatar"
        className="w-10 h-10 rounded-full"
      />
      <span className="text-lg tracking-wide">
        {user?.user?.user_metadata?.fullName}
      </span>
    </div>
  );
};
export default Avatar;
