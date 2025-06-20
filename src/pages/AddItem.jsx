import React from "react";
import { useState } from "react";

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
    <div className="max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Item</h1>
      <form
        onSubmit={handleFormSubmit}
        className="space-y-5 bg-white p-6 rounded shadow"
      >
        <div>
          <label className="block font-semibold mb-1">Item Name</label>
          <input
            type="text"
            name="name"
            value={itemForm.name}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
          {formErrors.name && (
            <div className="text-red-600 text-sm mt-1">{formErrors.name}</div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Item Type</label>
          <select
            name="type"
            value={itemForm.type}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select type</option>
            {ITEM_TYPE_OPTIONS.map((typeOption) => (
              <option key={typeOption} value={typeOption}>
                {typeOption}
              </option>
            ))}
          </select>
          {formErrors.type && (
            <div className="text-red-600 text-sm mt-1">{formErrors.type}</div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Item Description</label>
          <textarea
            name="description"
            value={itemForm.description}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
          {formErrors.description && (
            <div className="text-red-600 text-sm mt-1">
              {formErrors.description}
            </div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">Cover Image URL</label>
          <input
            type="text"
            name="coverImage"
            value={itemForm.coverImage}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
          {formErrors.coverImage && (
            <div className="text-red-600 text-sm mt-1">
              {formErrors.coverImage}
            </div>
          )}
        </div>
        <div>
          <label className="block font-semibold mb-1">
            Additional Image URLs (comma-separated)
          </label>
          <input
            type="text"
            name="additionalImages"
            value={itemForm.additionalImages}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          />
          {formErrors.additionalImages && (
            <div className="text-red-600 text-sm mt-1">
              {formErrors.additionalImages}
            </div>
          )}
          <div className="text-gray-500 text-xs mt-1">
            Enter URLs separated by commas
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
        >
          Add Item
        </button>
        {showSuccess && (
          <div className="text-green-600 font-semibold mt-2">
            Item successfully added
          </div>
        )}
      </form>
    </div>
  );
}
