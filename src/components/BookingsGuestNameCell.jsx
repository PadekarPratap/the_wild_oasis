const BookingsGuestNameCell = ({ row }) => {
  return (
    <div className="flex flex-col">
      <span>{row.guest.name}</span>
      <span className="text-gray-500">{row.guest.email}</span>
    </div>
  );
};
export default BookingsGuestNameCell;
