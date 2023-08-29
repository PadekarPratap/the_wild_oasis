const BookingStatus = ({ value }) => {
  const base = "px-3 py-1 rounded-full";

  const style = {
    unconfirmed: `${base} bg-blue-300 text-blue-800`,
    "checked-in": `${base} bg-green-300 text-green-800`,
    "checked-out": `${base} bg-gray-300 text-gray-800 `,
  };

  return <span className={style[value]}>{value}</span>;
};
export default BookingStatus;
