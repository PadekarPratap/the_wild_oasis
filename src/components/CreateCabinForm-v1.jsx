import { useForm } from "react-hook-form";
import FormControl from "./shared/FormControl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../services/apiCabin";
import { toast } from "react-hot-toast";
import { formatCurrency } from "../utils/helper";
import FormLoader from "./shared/FormLoader";

const CreateCabinForm = () => {
  const { register, handleSubmit, reset, formState, getValues } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: (newCabin) => createCabin(newCabin),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      console.log(data);
      toast.success(`${data[0].cabin_name} Cabin created successfully!`);
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (data) => {
    // console.log(data);
    mutate(data);
  };

  return (
    <div className="my-8">
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

        <FormControl label="Image" error={errors?.image?.message}>
          <input
            className="input-control file:bg-colorBrand600 file:text-white file:border-none file:px-4 file:py-3 file:cursor-pointer file: file:rounded-lg focus-within:ring-0"
            type="file"
            id="image_upload"
            {...register("image", {
              required: "This is a required field",
            })}
          />
        </FormControl>

        <div className="space-x-3 text-right">
          <button
            className="btn-primary bg-gray-200 hover:bg-gray-300 text-gray-800 focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2"
            type="reset"
          >
            Cancel
          </button>
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
        </div>
      </form>
    </div>
  );
};
export default CreateCabinForm;
