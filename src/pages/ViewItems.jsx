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
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">View Items</h1>
      <div className="flex flex-wrap gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow cursor-pointer p-4 m-2 flex-1 max-w-xs text-center hover:shadow-lg transition"
            onClick={() => openModalWithItem(item)}
          >
            <img
              src={item.coverImage}
              alt={item.name}
              className="w-full h-44 object-cover rounded mb-3"
            />
            <div className="font-semibold">{item.name}</div>
          </div>
        ))}
      </div>

      {/* Modal using react-modal */}
      <Modal
        isOpen={!!modalItem}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 relative mx-auto mt-16 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        {modalItem && (
          <>
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center w-full md:w-1/2">
                <div className="relative w-full">
                  <img
                    src={
                      modalItem.additionalImages[carouselIndex] ||
                      modalItem.coverImage
                    }
                    alt={modalItem.name}
                    className="w-full h-64 object-cover rounded"
                  />
                  {modalItem.additionalImages.length > 1 && (
                    <>
                      <button
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xl"
                        onClick={showPrevImage}
                        aria-label="Previous"
                      >
                        &#8592;
                      </button>
                      <button
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full px-2 py-1 text-xl"
                        onClick={showNextImage}
                        aria-label="Next"
                      >
                        &#8594;
                      </button>
                    </>
                  )}
                </div>
                <div className="mt-2 text-center text-sm text-gray-500">
                  {carouselIndex + 1} / {modalItem.additionalImages.length}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{modalItem.name}</h2>
                <div className="mb-2 text-gray-600">Type: {modalItem.type}</div>
                <div className="mb-4">{modalItem.description}</div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  <a href="mailto:someone@example.com?subject=Enquire">
                    Enquire
                  </a>
                </button>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
