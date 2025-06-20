import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ViewItems({ items }) {
  const [modalItem, setModalItem] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const openModalWithItem = (item) => {
    setModalItem(item);
    setCarouselIndex(0);
  };

  const closeModal = () => {
    setModalItem(null);
    setCarouselIndex(0);
  };

  const showPrevImage = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? modalItem.additionalImages.length - 1 : prev - 1
    );
  };

  const showNextImage = () => {
    setCarouselIndex((prev) =>
      prev === modalItem.additionalImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 px-2 sm:px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight drop-shadow-lg">
        View Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg cursor-pointer p-5 flex flex-col items-center border border-indigo-100 hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] hover:border-indigo-300 group"
            onClick={() => openModalWithItem(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm group-hover:shadow-md transition-all duration-200"
            />
            <div className="font-semibold text-xl text-indigo-800 group-hover:text-indigo-600 transition-colors duration-200">
              {item.name}
            </div>
          </div>
        ))}
      </div>

      {/* Modal using react-modal */}
      <Modal
        isOpen={!!modalItem}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-4 sm:p-8 relative mx-auto mt-16 outline-none border border-indigo-100 animate-fadeIn"
        overlayClassName="fixed inset-0 bg-gradient-to-br from-indigo-200/40 via-white/60 to-blue-200/40 flex items-center justify-center z-50 backdrop-blur-sm"
      >
        {modalItem && (
          <>
            <button
              className="absolute top-4 right-4 text-3xl text-indigo-300 hover:text-indigo-600 focus:text-indigo-700 transition-colors duration-200 bg-white/80 rounded-full p-2 shadow-md focus:outline-none"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center w-full md:w-1/2">
                <div className="relative w-full">
                  <img
                    src={
                      modalItem.additionalImages[carouselIndex] ||
                      modalItem.coverImage
                    }
                    alt={modalItem.name}
                    className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-lg border border-indigo-100"
                  />
                  {modalItem.additionalImages.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 border border-indigo-100 rounded-full px-3 py-1.5 text-2xl shadow hover:bg-indigo-100 hover:text-indigo-700 focus:bg-indigo-200 focus:text-indigo-800 transition-all duration-200"
                        onClick={showPrevImage}
                        aria-label="Previous"
                      >
                        &#8592;
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 border border-indigo-100 rounded-full px-3 py-1.5 text-2xl shadow hover:bg-indigo-100 hover:text-indigo-700 focus:bg-indigo-200 focus:text-indigo-800 transition-all duration-200"
                        onClick={showNextImage}
                        aria-label="Next"
                      >
                        &#8594;
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-3 text-center text-sm text-gray-500">
                  {carouselIndex + 1} / {modalItem.additionalImages.length}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center mt-6 md:mt-0">
                <h2 className="text-3xl font-bold mb-3 text-indigo-800">
                  {modalItem.name}
                </h2>
                <div className="mb-2 text-indigo-500 font-medium">
                  Type: {modalItem.type}
                </div>
                <div className="mb-5 text-gray-700 leading-relaxed">
                  {modalItem.description}
                </div>
                <a
                  href="mailto:someone@example.com?subject=Enquire"
                  className="inline-block bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold shadow hover:from-indigo-600 hover:to-blue-600 focus:from-indigo-700 focus:to-blue-700 transition-all duration-200 text-lg"
                >
                  Enquire
                </a>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
