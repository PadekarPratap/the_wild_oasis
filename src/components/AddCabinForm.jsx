import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "./Modal";

const AddCabinForm = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="mt-3">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="btn-primary"
        >
          Create Cabin
        </button>
      </div>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm onCloseModal={() => setShowForm(false)} />
        </Modal>
      )}
    </>
  );
};
export default AddCabinForm;
