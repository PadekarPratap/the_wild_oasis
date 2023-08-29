import { useForm } from "react-hook-form";
import FormControl from "./shared/FormControl";
import { formatCurrency } from "../utils/helper";
import FormLoader from "./shared/FormLoader";
import { useCreateCabin } from "../hooks/cabins/useCreateCabin";
import { useUpdateCabin } from "../hooks/cabins/useUpdateCabin";

const CreateCabinForm = ({ cabinData = {}, onCloseModal }) => {
  const {
    id: editId,
    cabin_name,
    max_capacity,
    regular_price,
    discount,
    description,
    image,
  } = cabinData;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState, getValues } = useForm({
    defaultValues: isEditSession
      ? { cabin_name, max_capacity, regular_price, discount, description }
      : {},
  });

  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  const { isUpdating, updateCabin } = useUpdateCabin();

  const onSubmit = (data) => {
    if (!isEditSession) {
      createCabin(data, {
        onSuccess: () => onCloseModal?.(),
      });
    } else {
      const { regular_price, discount, max_capacity, description, cabin_name } =
        data;
      const updatedCabin = {
        regular_price,
        discount,
        max_capacity,
        description,
        cabin_name,
        image,
      };
      updateCabin(
        { updatedCabin, id: editId },
        {
          onSuccess: () => onCloseModal?.(),
        }
      );
    }
  };

  return (
    <div>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Cabin Name" error={errors?.cabin_name?.message}>
          <input
            {...register("cabin_name", {
              required: "This is a required field",
            })}
            className="input-control"
            type="text"
            id="name"
          />
        </FormControl>
        <FormControl label="Description" error={errors?.description?.message}>
          <textarea
            {...register("description", {
              required: "This is a required field",
            })}
            id="desc"
            rows="3"
            className="resize-none input-control"
          ></textarea>
        </FormControl>
        <FormControl label="Max Capacity" error={errors?.max_capacity?.message}>
          <input
            {...register("max_capacity", {
              required: "This is a required field",
              min: {
                value: 1,
                message: "Max Capacity cannot be less than 1",
              },
            })}
            type="number"
            id="capacity"
            className="input-control"
          />
        </FormControl>
        <FormControl label="Price" error={errors?.regular_price?.message}>
          <input
            {...register("regular_price", {
              required: "This is a required field",
              min: {
                value: 20,
                message: `Price cannot be less than ${formatCurrency(20)}`,
              },
            })}
            type="number"
            id="price"
            className="input-control"
          />
        </FormControl>
        <FormControl label="Discount" error={errors?.discount?.message}>
          <input
            {...register("discount", {
              required: "This is a required field",
              validate: (value) => {
                return (
                  Number(value) < Number(getValues().regular_price) ||
                  "Discount connot be more than the price."
                );
              },
            })}
            type="number"
            id="discount"
            className="input-control"
          />
        </FormControl>

        {!isEditSession && (
          <FormControl label="Image" error={errors?.image?.message}>
            <input
              className="input-control file:bg-colorBrand600 file:text-white file:border-none file:px-4 file:py-3 file:cursor-pointer file: file:rounded-lg focus-within:ring-0 border-none"
              type="file"
              id="image_upload"
              {...register("image", {
                required: isEditSession ? false : "This is a required field",
              })}
            />
          </FormControl>
        )}

        <div className="space-x-3 text-right">
          <button
            className="btn-primary bg-gray-200 hover:bg-gray-300 text-gray-800 focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2"
            type="reset"
            onClick={() => onCloseModal?.()} // close the modal only when the form is inside the modal and a onCloseModal prop is received.
          >
            Cancel
          </button>
          {isEditSession ? (
            <button
              disabled={isUpdating}
              className="btn-primary inline-flex items-center"
            >
              {isUpdating ? (
                <>
                  <span className="mr-3">Edit Cabin</span>
                  <FormLoader />
                </>
              ) : (
                "Edit Cabin"
              )}
            </button>
          ) : (
            <button
              disabled={isCreating}
              className="btn-primary inline-flex items-center"
            >
              {isCreating ? (
                <>
                  <span className="mr-3">Creating Cabin</span>
                  <FormLoader />
                </>
              ) : (
                "Create a Cabin"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
export default CreateCabinForm;
