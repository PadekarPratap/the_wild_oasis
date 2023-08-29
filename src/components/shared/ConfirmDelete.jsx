import FormLoader from "./FormLoader";

const ConfirmDelete = ({
  title,
  resourceName,
  onDelete,
  onClose,
  isDeleting,
}) => {
  return (
    <div>
      <h2 className="mb-6 text-3xl font-semibold text-gray-800">
        Delete {title}
      </h2>
      <p className="text-xl md:text-2xl text-gray-800">
        Are you sure you want to delete{" "}
        <span className="font-bold italic">{resourceName}</span> permanently?
        This Action cannot be undone!
      </p>
      <div className="text-right space-x-4">
        <button
          onClick={onClose}
          className="btn-primary bg-gray-100 text-gray-800 hover:bg-gray-300 focus-within:ring-gray-800 focus-within:ring-offset-2"
        >
          Cancel
        </button>
        <button
          className="btn-primary text-red-100 bg-red-600 hover:bg-red-700 inline-flex gap-3 items focus-within:ring-red-500 focus-within:ring-offset-2"
          disabled={isDeleting}
          onClick={onDelete}
        >
          {isDeleting ? (
            <>
              <span>Deleting</span>
              <FormLoader />
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
};
export default ConfirmDelete;
