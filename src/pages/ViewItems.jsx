import React, { useState } from "react";
import Modal from "react-modal";
import { HiOutlineMail } from "react-icons/hi";

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
    <div className="min-h-screen bg-neutral-50 px-2 sm:px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-neutral-800 tracking-tight drop-shadow-sm">
        View Items
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md cursor-pointer p-6 flex flex-col items-center border border-neutral-200 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group animate-scale-in"
            onClick={() => openModalWithItem(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              className="w-full h-44 object-cover rounded-lg mb-4 shadow-sm group-hover:shadow transition-all duration-150"
            />
            <div className="font-semibold text-lg text-neutral-800 group-hover:text-neutral-600 transition-colors duration-150">
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
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-4 sm:p-8 relative mx-auto mt-16 outline-none border border-neutral-200 animate-scale-in"
        overlayClassName="fixed inset-0 bg-neutral-900/30 flex items-center justify-center z-50 backdrop-blur-sm"
      >
        {modalItem && (
          <>
            <button
              className="absolute top-4 right-4 text-2xl text-neutral-400 hover:text-neutral-700 focus:text-neutral-700 transition-colors duration-150 bg-neutral-100 rounded-full p-2 shadow hover:bg-neutral-200 focus:outline-none border border-neutral-200"
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
                    className="w-full h-64 sm:h-80 object-cover rounded-lg shadow border border-neutral-200"
                  />
                  {modalItem.additionalImages.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-xl shadow hover:scale-105 hover:bg-neutral-100 hover:text-neutral-700 focus:bg-neutral-200 focus:text-neutral-800 transition-all duration-150"
                        onClick={showPrevImage}
                        aria-label="Previous"
                      >
                        &#8592;
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-xl shadow hover:scale-105 hover:bg-neutral-100 hover:text-neutral-700 focus:bg-neutral-200 focus:text-neutral-800 transition-all duration-150"
                        onClick={showNextImage}
                        aria-label="Next"
                      >
                        &#8594;
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-3 text-center text-xs text-neutral-500">
                  {carouselIndex + 1} / {modalItem.additionalImages.length}
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-center mt-6 md:mt-0">
                <h2 className="text-2xl font-bold mb-2 text-neutral-800">
                  {modalItem.name}
                </h2>
                <div className="mb-2 text-neutral-500 font-medium">
                  Type: {modalItem.type}
                </div>
                <div className="mb-5 text-neutral-700 leading-relaxed">
                  {modalItem.description}
                </div>
                <a
                  href="mailto:someone@example.com?subject=Enquire"
                  className="inline-flex items-center gap-2 bg-neutral-800 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-neutral-700 focus:bg-neutral-900 transition-all duration-150 text-base border border-neutral-200 hover:scale-105 focus:scale-105 animate-scale-in"
                >
                  <HiOutlineMail className="text-xl" />
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
