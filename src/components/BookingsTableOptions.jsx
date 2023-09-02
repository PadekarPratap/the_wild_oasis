import {
  BsEye,
  BsFillArrowDownSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCheckout from "../hooks/bookings/useCheckout";

const BookingsTableOptions = ({ row }) => {
  const navigate = useNavigate();
  const { checkOut, checkingOut } = useCheckout();

  const handleCheckout = (bookingId) => {
    checkOut(bookingId);
  };

  return (
    <div className="space-x-3">
      <abbr title="view booking">
        <button
          onClick={() => navigate(`/booking/${row.id}`)}
          className="border-2 border-stone-300/40 w-10 h-10 rounded-lg shadow hover:bg-colorBrand500 hover:text-white hover:border-colorBrand500 inline-flex items-center justify-center"
        >
          <BsEye size={20} />
        </button>
      </abbr>

      {row.status === "unconfirmed" && (
        <abbr title="check in">
          <button
            disabled={checkingOut}
            onClick={() => navigate(`/checkin/${row.id}`)}
            className="border-2 border-stone-300/40 w-10 h-10 rounded-lg shadow hover:bg-colorBrand500 hover:text-white hover:border-colorBrand500 inline-flex items-center justify-center"
          >
            <BsFillArrowDownSquareFill size={20} />
          </button>
        </abbr>
      )}

      {row.status === "checked-in" && (
        <abbr title="check out">
          <button
            onClick={() => handleCheckout(row.id)}
            className="border-2 border-stone-300/40 w-10 h-10 rounded-lg shadow hover:bg-colorBrand500 hover:text-white hover:border-colorBrand500 inline-flex items-center justify-center"
          >
            <BsFillArrowUpSquareFill size={20} />
          </button>
        </abbr>
      )}
    </div>
  );
};
export default BookingsTableOptions;
