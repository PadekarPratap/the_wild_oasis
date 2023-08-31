import { useMutation } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBooking";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: checkingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, breakfast),
    onSuccess: (data) => {
      toast.success(`Booking #${data[0].id} has been successfully checkin`);
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkin, checkingIn };
};
