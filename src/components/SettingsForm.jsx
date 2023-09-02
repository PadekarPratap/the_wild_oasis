import { useSettings } from "../hooks/settings/useSettings";
import { useUpdateSettings } from "../hooks/settings/useUpdateSettings";
import ErrorMessage from "./ErrorMessage";
import FormControl from "./FormControl";
import Spinner from "./Spinner";

const SettingsForm = () => {
  const { isLoading, isError, error, settings = [{}] } = useSettings();

  const {
    maxDaysBooking,
    minDaysBooking,
    maxGuestsPerBooking,
    breakfast_price,
  } = settings[0];

  const { isUpdating, updateSettings } = useUpdateSettings();

  const handleUpdateSettings = (e, field) => {
    const { value } = e.target;
    if (!value) return;
    updateSettings({ updatedsettings: { [field]: value }, id: 1 });
  };

  return (
    <div className="p-4 rounded-lg">
      {isLoading ? (
        <div className="flex justify-center mt-16">
          <Spinner />
        </div>
      ) : isError ? (
        <ErrorMessage message={error.message} />
      ) : (
        <form>
          <FormControl label={"Minimum Nights/Booking"}>
            <input
              className="input-control border border-gray-400 disabled:bg-colorBrand200 disabled:cursor-not-allowed"
              type="number"
              id="max-booking"
              defaultValue={minDaysBooking}
              onBlur={(e) => handleUpdateSettings(e, "minDaysBooking")}
              disabled={isUpdating}
            />
          </FormControl>

          <FormControl label={"Maximum Nights/Booking"}>
            <input
              className="input-control border border-gray-400 disabled:bg-colorBrand200 disabled:cursor-not-allowed"
              type="number"
              id="min-booking"
              defaultValue={maxDaysBooking}
              onBlur={(e) => handleUpdateSettings(e, "maxDaysBooking")}
              disabled={isUpdating}
            />
          </FormControl>

          <FormControl label={"Maximum Guests/Booking"}>
            <input
              className="input-control border border-gray-400 disabled:bg-colorBrand200 disabled:cursor-not-allowed"
              type="number"
              id="max-guests-booking"
              defaultValue={maxGuestsPerBooking}
              onBlur={(e) => handleUpdateSettings(e, "maxGuestsPerBooking")}
              disabled={isUpdating}
            />
          </FormControl>

          <FormControl label={"Breakfast Price"}>
            <input
              className="input-control border border-gray-400 disabled:bg-colorBrand200 disabled:cursor-not-allowed"
              type="number"
              id="breakfast-price"
              defaultValue={breakfast_price}
              onBlur={(e) => handleUpdateSettings(e, "breakfast_price")}
              disabled={isUpdating}
            />
          </FormControl>
        </form>
      )}
    </div>
  );
};
export default SettingsForm;
