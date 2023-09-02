import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "../hooks/bookings/useBooking";
import BookingStatus from "./BookingStatus";
import { HiOutlineHomeModern } from "react-icons/hi2";
import {
  TimeAgo,
  formatCurrency,
  formatDateInDetail,
  formatTimeInDetail,
} from "../utils/helper";
import Spinner from "./Spinner";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineDollarCircle } from "react-icons/ai";
import Button from "./Button";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import Modal from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import useDeleteBooking from "../hooks/bookings/useDeleteBooking";

const BookingDetails = () => {
  const { booking = {}, isLoading, isError, error } = useBooking();

  const [openDeleteBookingModal, setOpenDeleteBookingModal] = useState(false);

  const { isDeleting, deleteBooking } = useDeleteBooking();

  console.log(booking);

  const navigate = useNavigate();

  // convert the variables into camelCase
  const {
    id: bookingId,
    created_at: createdAt,
    total_price: totalPrice,
    extra_price: extraPrice,
    booking_price: bookingPrice,
    status,
    is_paid: isPaid,
    guest = {},
    start_date: startDate,
    end_date: endDate,
    cabin = {},
    has_breakfast: hasBreakfast,
    no_of_nights: numNights,
    no_of_guests: numGuests,
  } = booking;

  const { cabin_name: cabinName } = cabin;
  const { name, email, national_id: nationalId } = guest;

  const guestsExcludingMainGuest = numGuests - 1;

  if (isLoading)
    return (
      <div className="flex justify-center mt-[20%]">
        <Spinner />
      </div>
    );

  return (
    <>
      {isError ? (
        <div className="mt-[5%]">
          <ErrorMessage message={error.message} />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto">
          <div className=" items-center flex justify-between">
            <div className="flex items-center flex-wrap gap-4">
              <h1 className="dark:text-white text-2xl md:text-4xl tracking-wide font-semibold">
                Booking #{bookingId}
              </h1>
              <BookingStatus value={status} />
            </div>

            <Link
              className="text-colorBrand500 text-lg font-semibold drop-shadow-lg"
              to={-1}
            >
              &larr;
              <span>Back</span>
            </Link>
          </div>

          {/* main card  */}
          <div className="mt-24 rounded-md overflow-hidden bg-white shadow-lg dark:bg-slate-800 dark:text-white">
            {/* card header  */}
            <div className="flex flex-col items-center gap-7 md:gap-4 md:flex-row md:items-center md:justify-between bg-colorBrand500 text-white p-3">
              <h2 className="flex items-center gap-5 wrap text-xl md:text-2xl">
                <HiOutlineHomeModern size={40} />
                <span>
                  <span>{numNights}</span>{" "}
                  <span>Nights in Cabin {cabinName}</span>
                </span>
              </h2>

              <div className="text-xl md:text-xl">
                <span>
                  {formatDateInDetail(startDate)} ({TimeAgo(startDate)})
                </span>{" "}
                - <span>{formatDateInDetail(endDate)}</span>
              </div>
            </div>

            {/* card body  */}
            <div className="mt-8 px-12 pb-8">
              <div className="text-lg md:text-xl font-medium text-[#6b7280] flex flex-wrap gap-5">
                <span className="text-black dark:text-white">
                  {name} + {guestsExcludingMainGuest}{" "}
                  {guestsExcludingMainGuest > 1 ? "guests" : "guest"}
                </span>
                <span>
                  <span>&#9679;</span> {email}
                </span>
                <span>
                  <span>&#9679;</span> National ID: {nationalId}
                </span>
              </div>

              <div className="flex mt-7 items-center gap-2 text-xl font-sono">
                <BsCheck2Circle className="text-colorBrand500" size={30} />
                <p className="font-bold">Breakfast included?</p>
                <p>{hasBreakfast ? "Yes" : "No"}</p>
              </div>

              <div
                className={`flex flex-col gap-5 lg:gap-2 lg:flex-row lg:items-center lg:justify-between mt-8  ${
                  isPaid
                    ? "bg-green-200 text-green-700"
                    : "bg-yellow-200 text-yellow-700"
                } px-8 py-5 rounded-lg max-w-screen-lg mx-auto text-lg`}
              >
                <div className="flex items-center gap-2 text-lg self-center md:self-stretch">
                  <AiOutlineDollarCircle size={25} />
                  <span>Total Price</span>
                  {formatCurrency(totalPrice)}{" "}
                  <span className="hidden sm:inline">
                    ({formatCurrency(bookingPrice)} Cabin +{" "}
                    {formatCurrency(extraPrice)} Breakfast)
                  </span>
                </div>

                <div className="font-semibold self-center">
                  {isPaid ? "Paid" : "will pay at Property"}
                </div>
              </div>

              <div className="mt-12 text-right text tracking-wide text-gray-500">
                <p>Booked {formatTimeInDetail(createdAt)}</p>
              </div>
            </div>
          </div>

          {/* buttons   */}

          <div className="mt-12 sm:text-right sm:space-x-3 flex flex-col gap-4 sm:block">
            {status === "unconfirmed" && (
              <Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                variant="primary"
              >
                Check In
              </Button>
            )}
            <Button
              onClick={() => setOpenDeleteBookingModal((prev) => !prev)}
              variant="danger"
            >
              Delete Booking
            </Button>
            <Button onClick={() => navigate(-1)} variant="secondary">
              Back
            </Button>
          </div>
        </div>
      )}

      {/* delete booking modal window  */}
      {openDeleteBookingModal && (
        <Modal onClose={() => setOpenDeleteBookingModal(false)}>
          <ConfirmDelete
            onClose={() => setOpenDeleteBookingModal(false)}
            title="Booking"
            resourceName={`Booking ${bookingId}`}
            onDelete={() => {
              deleteBooking(bookingId);
              navigate(-1);
            }}
            isDeleting={isDeleting}
          />
        </Modal>
      )}
    </>
  );
};
export default BookingDetails;
