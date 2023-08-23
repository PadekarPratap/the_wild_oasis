import { formatCurrency } from "../utils/helper";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../hooks/cabins/useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { FaCopy } from "react-icons/fa";
import { useCreateCabin } from "../hooks/cabins/useCreateCabin";

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const {
    cabin_name,
    max_capacity,
    regular_price,
    discount,
    image,
    id,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();

  const handleDuplicateCabin = () => {
    createCabin({
      cabin_name: `Copy of ${cabin_name}`,
      max_capacity,
      regular_price,
      discount,
      image,
      description,
    });
  };

  return (
    <>
      <tr className="odd:bg-gray-50 even:bg-white">
        <td className="p-3 font-medium text-gray-700">
          <img className="w-44" src={image} alt={`${cabin_name} image`} />
        </td>
        <td className="p-3 font-medium text-gray-700">{cabin_name}</td>
        <td className="p-3 font-medium text-gray-700">{max_capacity} guests</td>
        <td className="p-3 font-medium text-gray-700">
          {formatCurrency(regular_price)}
        </td>
        <td className="p-3 font-medium text-green-500">
          {discount < 1 ? <span>&#x2015;</span> : formatCurrency(discount)}
        </td>
        <td className="p-3 font-medium text-gray-700">
          <div>
            <button disabled={isCreating} onClick={handleDuplicateCabin}>
              <FaCopy />
            </button>
            <button onClick={() => setShowEditForm((prev) => !prev)}>
              <HiPencil />
            </button>
            <button disabled={isDeleting} onClick={() => deleteCabin(id)}>
              <HiTrash />
            </button>
          </div>
        </td>
      </tr>

      {showEditForm && <CreateCabinForm cabinData={cabin} />}
    </>
  );
};
export default CabinRow;
