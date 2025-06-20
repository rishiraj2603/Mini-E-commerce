import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";
import "./App.css";

function getJsonFromStorage(key, defaultValue) {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;
    return JSON.parse(value);
  } catch {
    return defaultValue;
  }
}

function setJsonToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error(`Error saving ${key} to localStorage`);
  }
}

function App() {
  const [items, setItems] = useState([]);
  console.log("🚀 ~ App ~ items:", items);
  useEffect(() => {
    setJsonToStorage("items", items);
  }, [items]);

  useEffect(() => {
    const stored = getJsonFromStorage("items", []);
    console.log("🚀 ~ useEffect ~ stored:", typeof stored);
    console.log("🚀 ~ useEffect ~ stored:", stored.length);
    if (stored.length === 0) {
      console.log(
        "No items found in localStorage, initializing with default items."
      );
      setItems([
        {
          id: 1,
          name: "Nike Running Shoes",
          type: "Shoes",
          description: "Comfortable running shoes for everyday use",
          coverImage:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmlrZSUyMHJ1bm5pbmclMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
          additionalImages: [
            "https://images.unsplash.com/photo-1739132268718-53d64165d29a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlrZSUyMHJ1bm5pbmclMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG5pa2UlMjBydW5uaW5nJTIwc2hvZXN8ZW58MHx8MHx8fDA%3D",
          ],
        },
        {
          id: 2,
          name: "Cotton T-Shirt",
          type: "Shirt",
          description: "Classic cotton t-shirt in white",
          coverImage:
            "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvdHRvbiUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
          additionalImages: [
            "https://images.unsplash.com/photo-1713881587420-113c1c43e28a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvdHRvbiUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1722310752951-4d459d28c678?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvdHRvbiUyMHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
          ],
        },
      ]);
    } else {
      setItems(stored);
    }
  }, []);

  function addItem(newItem) {
    setItems([...items, { ...newItem, id: Date.now() }]);
  }

  return (
    <Router>
      <nav className="bg-blue-600 text-white px-4 sm:px-8 py-4 flex flex-wrap gap-4 sm:gap-6 items-center justify-between shadow-md sticky top-0 z-10 transition-all duration-300">
        <div className="flex gap-4 items-center w-full sm:w-auto justify-between">
          <Link
            to="/"
            className="font-bold text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
          >
            View Items
          </Link>
          <Link
            to="/add"
            className="font-bold text-lg hover:underline focus:outline-none focus:ring-2 focus:ring-white transition-all duration-200"
          >
            Add Item
          </Link>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto py-6 px-2 sm:px-6 transition-all duration-300">
        <Routes>
          <Route path="/" element={<ViewItems items={items} />} />
          <Route path="/add" element={<AddItem addItem={addItem} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
