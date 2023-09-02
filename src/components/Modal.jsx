import { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const closeModalOnEscape = (e) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", closeModalOnEscape);

    return () => document.removeEventListener("keydown", closeModalOnEscape);
  }, [onClose]);

  return createPortal(
    // overlay
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999999] backdrop-blur-sm bg-slate-200/30"
    >
      {/* modal wrapper  */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md w-full px-5"
      >
        {/* modal content  */}
        <div className="bg-white p-5 rounded-lg overflow-auto max-h-[90vh]  shadow-xl">
          <button
            onClick={onClose}
            type="button"
            className="block ml-auto text-3xl px-3 py-1 hover:bg-colorBrand50 rounded-lg mb-3"
          >
            &times;
          </button>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
export default Modal;
