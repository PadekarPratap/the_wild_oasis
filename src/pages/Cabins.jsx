import CabinTable from "../components/CabinTable";
import { useState } from "react";
import CreateCabinForm from "../components/CreateCabinForm";
import { useCabins } from "../hooks/cabins/useCabins";

const Cabins = () => {
  const { isError, isLoading, cabins, error } = useCabins();

  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-2xl md:text-4xl tracking-wide font-semibold">
          Cabins
        </h1>
        <p>Filter / sort</p>
      </div>

      {/* table  */}
      <CabinTable
        cabins={cabins}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      <div className="mt-3">
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="btn-primary"
        >
          Create Cabin
        </button>
      </div>

      {showForm && <CreateCabinForm />}
    </div>
  );
};
export default Cabins;
