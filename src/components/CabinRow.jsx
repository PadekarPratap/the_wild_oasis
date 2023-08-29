import { formatCurrency } from "../utils/helper";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "../hooks/cabins/useDeleteCabin";
import { HiPencil, HiTrash } from "react-icons/hi2";
import { FaCopy } from "react-icons/fa";
import { useCreateCabin } from "../hooks/cabins/useCreateCabin";
import Modal from "./shared/modal/Modal";
import ConfirmDelete from "./shared/ConfirmDelete";
import Table from "./shared/table/Table";

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      <Table.Row>
        <Table.DataCell data="Image :">
          <img
            className="max-w-[6rem] mx-auto"
            src={image}
            alt={`${cabin_name} image`}
          />
        </Table.DataCell>
        <Table.DataCell data="Name :">{cabin_name}</Table.DataCell>
        <Table.DataCell data="Capacity :">{max_capacity} guests</Table.DataCell>
        <Table.DataCell data="price :">
          {formatCurrency(regular_price)}
        </Table.DataCell>
        <Table.DataCell data="Discount :" color="text-green-500">
          {discount < 1 ? <span>&#x2015;</span> : formatCurrency(discount)}
        </Table.DataCell>
        <Table.DataCell data="# :">
          <div className="flex  gap-1 items-center">
            <button
              data-tooltip="Copy Cabin"
              className="p-2 hover:bg-colorBrand50 rounded relative"
              disabled={isCreating}
              onClick={handleDuplicateCabin}
            >
              <FaCopy />
            </button>
            <button
              data-tooltip="Edit Cabin"
              className="p-2 hover:bg-colorBrand50 rounded relative"
              onClick={() => setShowEditForm((prev) => !prev)}
            >
              <HiPencil />
            </button>
            <button
              data-tooltip="Delete Cabin"
              className="p-2 hover:bg-colorBrand50 rounded relative"
              onClick={() => setShowDeleteModal((prev) => !prev)}
            >
              <HiTrash />
            </button>
            {showDeleteModal && (
              <Modal onClose={() => setShowDeleteModal(false)}>
                <ConfirmDelete
                  title="Cabin"
                  isDeleting={isDeleting}
                  resourceName={cabin_name}
                  onDelete={() => deleteCabin(id)}
                  onClose={() => setShowDeleteModal(false)}
                />
              </Modal>
            )}
          </div>
        </Table.DataCell>
      </Table.Row>

      {showEditForm && (
        <Modal onClose={() => setShowEditForm(false)}>
          <CreateCabinForm
            cabinData={cabin}
            onCloseModal={() => setShowEditForm(false)}
          />
        </Modal>
      )}
    </>
  );
};
export default CabinRow;
