import React, { useState, useEffect } from "react";

const ITEM_TYPE_OPTIONS = [
  "Shirt",
  "Pant",
  "Shoes",
  "Sports Gear",
  "Accessory",
  "Other",
];

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export default function AddItem({ addItem }) {
  const [itemForm, setItemForm] = useState({
    name: "",
    type: "",
    description: "",
    coverImage: "",
    additionalImages: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  useEffect(() => {
    setAnimateCard(true);
  }, []);

  const handleInputChange = (e) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const validateForm = () => {
    const errors = {};
    if (!itemForm.name) errors.name = "Item name is required";
    if (!itemForm.type) errors.type = "Item type is required";
    if (!itemForm.description) errors.description = "Description is required";
    if (!itemForm.coverImage || !isValidUrl(itemForm.coverImage))
      errors.coverImage = "Valid cover image URL required";
    if (itemForm.additionalImages) {
      const urls = itemForm.additionalImages.split(",").map((u) => u.trim());
      if (!urls.every(isValidUrl))
        errors.additionalImages = "All additional images must be valid URLs";
    }
    return errors;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    addItem({
      name: itemForm.name,
      type: itemForm.type,
      description: itemForm.description,
      coverImage: itemForm.coverImage,
      additionalImages: itemForm.additionalImages
        ? itemForm.additionalImages.split(",").map((u) => u.trim())
        : [],
    });
    setItemForm({
      name: "",
      type: "",
      description: "",
      coverImage: "",
      additionalImages: "",
    });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-neutral-50 transition-all duration-500">
      <div
        className={`w-full max-w-xl mx-auto p-2 sm:p-8 transition-all duration-700 ${
          animateCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } animate-scale-in`}
      >
        <h1 className="text-3xl font-extrabold mb-8 text-center text-neutral-800 drop-shadow-sm tracking-tight">
          Add New Item
        </h1>
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6 bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-xl shadow-xl border border-neutral-200 transition-all duration-300"
        >
          <div>
            <label className="block font-semibold mb-1 text-neutral-800">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={itemForm.name}
              onChange={handleInputChange}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all duration-150 bg-neutral-50 placeholder:text-neutral-400"
              placeholder="e.g. Nike Running Shoes"
            />
            {formErrors.name && (
              <div className="text-red-600 text-sm mt-1 animate-fade-in">
                {formErrors.name}
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-neutral-800">
              Item Type
            </label>
            <select
              name="type"
              value={itemForm.type}
              onChange={handleInputChange}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all duration-150 bg-neutral-50 text-neutral-700"
            >
              <option value="">Select type</option>
              {ITEM_TYPE_OPTIONS.map((typeOption) => (
                <option
                  key={typeOption}
                  value={typeOption}
                  className="text-neutral-700"
                >
                  {typeOption}
                </option>
              ))}
            </select>
            {formErrors.type && (
              <div className="text-red-600 text-sm mt-1 animate-fade-in">
                {formErrors.type}
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-neutral-800">
              Item Description
            </label>
            <textarea
              name="description"
              value={itemForm.description}
              onChange={handleInputChange}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all duration-150 bg-neutral-50 placeholder:text-neutral-400"
              rows={3}
              placeholder="Describe the item..."
            />
            {formErrors.description && (
              <div className="text-red-600 text-sm mt-1 animate-fade-in">
                {formErrors.description}
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-neutral-800">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              value={itemForm.coverImage}
              onChange={handleInputChange}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all duration-150 bg-neutral-50 placeholder:text-neutral-400"
              placeholder="https://..."
            />
            {formErrors.coverImage && (
              <div className="text-red-600 text-sm mt-1 animate-fade-in">
                {formErrors.coverImage}
              </div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1 text-neutral-800">
              Additional Image URLs (comma-separated)
            </label>
            <input
              type="text"
              name="additionalImages"
              value={itemForm.additionalImages}
              onChange={handleInputChange}
              className="w-full border border-neutral-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all duration-150 bg-neutral-50 placeholder:text-neutral-400"
              placeholder="https://..., https://..."
            />
            {formErrors.additionalImages && (
              <div className="text-red-600 text-sm mt-1 animate-fade-in">
                {formErrors.additionalImages}
              </div>
            )}
            <div className="text-neutral-400 text-xs mt-1">
              Enter URLs separated by commas
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-neutral-800 text-white px-6 py-2 rounded-lg hover:bg-neutral-700 font-semibold shadow transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-neutral-400 animate-scale-in"
          >
            Add Item
          </button>
          {showSuccess && (
            <div className="text-green-600 font-semibold mt-2 animate-fade-in">
              Item successfully added
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
