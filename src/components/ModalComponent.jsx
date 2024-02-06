import { useState } from "react";

const ModalComponent = ({
  onClick = () => {},
  textBtn,
  titleModal,
  children,
  className = "block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
}) => {
  const [showModal, setShowModal] = useState(false);

  const mostrarModal = () => {
    onClick();
    setShowModal(!showModal);
  };

  return (
    <>
      {/* <!-- Modal button --> */}
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className={className}
        onClick={mostrarModal}
        type="button"
      >
        {textBtn}
      </button>

      {showModal && (
        <>
          <div
            id="default-modal"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 justify-center z-50 items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div
              className="h-[100vh] fixed top-0 w-full bg-black/40"
              onClick={() => setShowModal(!showModal)}
            ></div>
            <div className="relative p-4 w-full mx-auto mt-40 max-w-2xl max-h-full z-40">
              {/* <!-- Modal content --> */}
              <div className="relative bg-white rounded-lg shadow text-black z-40">
                {/* <!-- Modal header --> */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-700">
                    {titleModal}
                  </h3>
                  <button
                    type="button"
                    className="text-black bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-black dark:hover:text-white"
                    data-modal-hide="default-modal"
                    onClick={() => setShowModal(!showModal)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="p-4 md:p-5 space-y-4">{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ModalComponent;
