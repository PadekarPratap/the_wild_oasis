import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBooking";
import { toast } from "react-hot-toast";

const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
};
export default useDeleteBooking;
