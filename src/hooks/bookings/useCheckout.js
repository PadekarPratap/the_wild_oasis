import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBooking";
import { toast } from "react-hot-toast";

const useCheckout = () => {
  const queryClient = useQueryClient();

  const { isLoading: checkingOut, mutate: checkOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`${data[0].id} has successfully checkout`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error("There was an error checking out"),
  });

  return { checkingOut, checkOut };
};
export default useCheckout;
