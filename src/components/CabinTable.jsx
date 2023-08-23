import { formatCurrency } from "../utils/helper";
import CabinRow from "./CabinRow";
import ErrorMessage from "./shared/ErrorMessage";
import Spinner from "./shared/Spinner";

const CabinTable = ({ isLoading, isError, cabins, error }) => {
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <>
          <div className="hidden md:block shadow-lg rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-300">
                <tr>
                  <th className="w-44 p-3 text-lg font-semibold text-left tracking-wide">
                    Image
                  </th>
                  <th className="w-auto p-3 text-lg font-semibold text-left tracking-wide">
                    Name
                  </th>
                  <th className="w-36 p-3 text-lg font-semibold text-left tracking-wide">
                    Max Capacity
                  </th>
                  <th className="w-20 p-3 text-lg font-semibold text-left tracking-wide">
                    Price
                  </th>
                  <th className="w-20 p-3 text-lg font-semibold text-left tracking-wide">
                    Discount
                  </th>
                  <th className="w-10 p-3 text-lg font-semibold text-left tracking-wide"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {cabins?.map((cabin) => (
                  <CabinRow key={cabin.id} cabin={cabin} />
                ))}
              </tbody>
            </table>
          </div>

          {/* mobile view  */}
          <div className="grid grid-cols-1 md:hidden gap-4">
            {cabins?.map((cabin) => (
              <div className="bg-white rounded-md shadow p-4" key={cabin.id}>
                <div className="flex flex-col xs:flex-row gap-4">
                  <div className="basis-[40%]">
                    <img
                      className="w-full h-full object-cover object-center"
                      src={cabin.image}
                      alt={`${cabin.cabin_name} image`}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-wide">
                      {cabin.cabin_name}
                    </h2>
                    <p>
                      Max Capacity:{" "}
                      <span className="font-bold font-sono">
                        {cabin.max_capacity} guests
                      </span>
                    </p>
                    <p>
                      Price:{" "}
                      <span className="font-sono font-semibold">
                        {formatCurrency(cabin.regular_price)}
                      </span>
                    </p>
                    <p>
                      Discount:{" "}
                      <span className="text-green-500 font-sono">
                        {formatCurrency(cabin.discount)}
                      </span>
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default CabinTable;
