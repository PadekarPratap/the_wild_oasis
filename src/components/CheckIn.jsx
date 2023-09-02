import { Link, useNavigate } from "react-router-dom";
import BookingStatus from "./BookingStatus";
import { useBooking } from "../hooks/bookings/useBooking";
import Spinner from "./Spinner";
import {
  TimeAgo,
  formatCurrency,
  formatDateInDetail,
  formatTimeInDetail,
} from "../utils/helper";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { HiOutlineHomeModern } from "react-icons/hi2";
import ErrorMessage from "./ErrorMessage";
import { useEffect, useState } from "react";
import Button from "./Button";
import { useCheckin } from "../hooks/bookings/useCheckin";
import FormLoader from "./FormLoader";
import { useSettings } from "../hooks/settings/useSettings";

const CheckIn = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [confirmBreakfast, setConfirmBreakfast] = useState(false);
  const navigate = useNavigate();

  const { settings, isLoading: isLoadingSettings } = useSettings();

  const { checkin, checkingIn } = useCheckin();

  const { isError, isLoading, error, booking = {} } = useBooking();

  useEffect(() => {
    setConfirmPaid(booking?.is_paid || false);
  }, [booking]);

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

  const handleCheckin = () => {
    if (!confirmPaid) return;

    if (confirmBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          has_breakfast: true,
          extra_price: optionalBreakfastPrice,
          total_price: optionalBreakfastPrice + totalPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  };

  if (isLoading || isLoadingSettings)
    return (
      <div className="mt-20 flex justify-center">
        <Spinner />
      </div>
    );

  const optionalBreakfastPrice =
    settings[0]?.breakfast_price * numNights * numGuests;
  return (
    <>
      {isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <div className="max-w-screen-xl mx-auto">
            <div className=" items-center flex justify-between">
              <div className="flex items-center flex-wrap gap-4">
                <h1 className="text-2xl md:text-4xl tracking-wide font-semibold dark:text-white">
                  Check In #{bookingId}
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
          </div>
          {/* main card */}
          <div className="mt-24 rounded-md overflow-hidden bg-white shadow-lg">
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
            <div className="pt-8 px-12 pb-8 dark:bg-slate-700 dark:text-white">
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

          {/* optional Breakfast box  */}
          {!hasBreakfast && (
            <div className="mt-16 px-4 py-5 bg-white rounded-xl flex items-center gap-8 dark:bg-slate-700 dark:text-white">
              <input
                type="checkbox"
                id="breakfast"
                className="w-5 h-5 accent-colorBrand500"
                checked={confirmBreakfast}
                onChange={() => {
                  setConfirmBreakfast((prev) => !prev);
                  setConfirmPaid(false);
                }}
              />
              <label
                htmlFor="breakfast"
                className="text-xl font-medium font-sono cursor-pointer"
              >
                Want to add breakfast for{" "}
                {formatCurrency(optionalBreakfastPrice)}?
              </label>
            </div>
          )}

          {/* confirm box */}
          <div className="mt-16 px-4 py-5 bg-white rounded-xl flex items-center gap-8 dark:bg-slate-700 dark:text-white">
            <input
              type="checkbox"
              id="confirm"
              className="w-5 h-5 accent-colorBrand500"
              checked={confirmPaid}
              onChange={() => setConfirmPaid((prev) => !prev)}
              disabled={confirmPaid}
            />
            <label
              htmlFor="confirm"
              className="text-xl font-medium font-sono cursor-pointer"
            >
              I confirm that {name} has paid the total amount of{" "}
              {confirmBreakfast
                ? `${formatCurrency(
                    totalPrice + optionalBreakfastPrice
                  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                    optionalBreakfastPrice
                  )})`
                : formatCurrency(totalPrice)}
            </label>
          </div>

          {/* checkIn button  */}
          <div className="mt-6 flex gap-4 justify-end">
            <Button
              disabled={checkingIn}
              onClick={handleCheckin}
              variant="primary"
            >
              {checkingIn ? (
                <>
                  <FormLoader />
                  Checking In
                </>
              ) : (
                "Check In"
              )}
            </Button>
            <Button onClick={() => navigate(-1)} variant="secondary">
              Back
            </Button>
          </div>
        </>
      )}
    </>
  );
};
export default CheckIn;
