import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItems";
import "./App.css";
import { getJsonFromStorage, setJsonToStorage } from "./util/localStorage";

const initialItems = [
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
  {
    id: 3,
    name: "Classic White Shirt",
    type: "Shirt",
    description:
      "A timeless white shirt made from 100% organic cotton. Perfect for both formal and casual wear.",
    coverImage:
      "https://images.unsplash.com/photo-1713881604560-085594ed2c3d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fENsYXNzaWMlMjBXaGl0ZSUyMFNoaXJ0fGVufDB8fDB8fHww",
    additionalImages: [
      "https://plus.unsplash.com/premium_photo-1678218594563-9fe0d16c6838?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xhc3NpYyUyMFdoaXRlJTIwU2hpcnR8ZW58MHx8MHx8fDA%3D",
      "https://images.unsplash.com/photo-1580981440054-9dbd7d830a6b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fENsYXNzaWMlMjBXaGl0ZSUyMFNoaXJ0fGVufDB8fDB8fHww",
    ],
  },
  {
    id: 4,
    name: "Slim Fit Denim Jeans",
    type: "Pant",
    description:
      "Comfortable and stylish slim-fit jeans with a stretchable fabric for everyday use.",
    coverImage:
      "https://plus.unsplash.com/premium_photo-1674828601017-2b8d4ea90aca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fFNsaW0lMjBGaXQlMjBEZW5pbSUyMEplYW5zfGVufDB8fDB8fHww",
    additionalImages: [
      "https://images.unsplash.com/photo-1721637222188-fa7bf56ceaf5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fFNsaW0lMjBGaXQlMjBEZW5pbSUyMEplYW5zfGVufDB8fDB8fHwwY",
      "https://images.unsplash.com/photo-1616411598297-e0053c6ee59d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFNsaW0lMjBGaXQlMjBEZW5pbSUyMEplYW5zfGVufDB8fDB8fHww",
    ],
  },
  {
    id: 5,
    name: "Running Sneakers",
    type: "Shoes",
    description:
      "Lightweight running sneakers with breathable mesh and durable rubber soles.",
    coverImage:
      "https://images.unsplash.com/photo-1619253341026-74c609e6ce50?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8UnVubmluZyUyMFNuZWFrZXJzfGVufDB8fDB8fHww",
    additionalImages: [
      "https://images.unsplash.com/photo-1709258228137-19a8c193be39?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UnVubmluZyUyMFNuZWFrZXJzfGVufDB8fDB8fHww",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fFJ1bm5pbmclMjBTbmVha2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
    ],
  },
  {
    id: 6,
    name: "Basketball Kit",
    type: "Sports Gear",
    description:
      "Complete basketball gear set including jersey, shorts, and wristbands.",
    coverImage:
      "https://images.unsplash.com/photo-1642326828805-0d3251cc250f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fEJhc2tldGJhbGwlMjBLaXR8ZW58MHx8MHx8fDA%3D",
    additionalImages: [
      "https://images.unsplash.com/photo-1603068308869-cefa8d0c9a9c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fEJhc2tldGJhbGwlMjBLaXR8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664536968216-dda8e9f5c912?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fEJhc2tldGJhbGwlMjBLaXR8ZW58MHx8MHx8fDA%3D",
    ],
  },
  {
    id: 7,
    name: "Graphic Printed Hoodie",
    type: "Shirt",
    description:
      "A stylish hoodie with a bold graphic print. Made from warm fleece material.",
    coverImage:
      "https://images.unsplash.com/photo-1685354217981-26c14a211bf8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fEdyYXBoaWMlMjBQcmludGVkJTIwSG9vZGllfGVufDB8fDB8fHww",
    additionalImages: [
      "https://images.unsplash.com/photo-1643216668075-d9d7442f7441?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fEdyYXBoaWMlMjBQcmludGVkJTIwSG9vZGllfGVufDB8fDB8fHww",
      "https://plus.unsplash.com/premium_photo-1673356301340-4522591be5f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEdyYXBoaWMlMjBQcmludGVkJTIwSG9vZGllfGVufDB8fDB8fHww",
    ],
  },
];

function App() {
  const [items, setItems] = useState(getJsonFromStorage("items", initialItems));
  const location = useLocation();

  useEffect(() => {
    setJsonToStorage("items", items);
  }, [items]);

  function addItem(newItem) {
    setItems([...items, { ...newItem, id: Date.now() }]);
  }

  return (
    <>
      <nav className="bg-white/90 text-neutral-900 px-6 sm:px-12 py-4 flex flex-wrap gap-4 sm:gap-8 items-center justify-between border-b border-neutral-200 shadow-sm sticky top-0 z-10 transition-all duration-300 backdrop-blur-md">
        <div className="flex gap-6 items-center w-full sm:w-auto justify-between">
          <Link
            to="/"
            className={`font-semibold text-base sm:text-lg px-2 py-1 rounded-md transition-all duration-150 animate-scale-in focus:outline-none focus:ring-2 focus:ring-neutral-300 hover:bg-neutral-100 ${
              location.pathname === "/"
                ? "bg-neutral-200 text-neutral-900 font-bold shadow-sm"
                : ""
            }`}
          >
            View Items
          </Link>
          <Link
            to="/add"
            className={`font-semibold text-base sm:text-lg px-2 py-1 rounded-md transition-all duration-150 animate-scale-in focus:outline-none focus:ring-2 focus:ring-neutral-300 hover:bg-neutral-100 ${
              location.pathname === "/add"
                ? "bg-neutral-200 text-neutral-900 font-bold shadow-sm"
                : ""
            }`}
          >
            Add Item
          </Link>
        </div>
      </nav>
      <div className="max-w-5xl mx-auto py-8 px-3 sm:px-8 transition-all duration-300">
        <Routes>
          <Route path="/" element={<ViewItems items={items} />} />
          <Route path="/add" element={<AddItem addItem={addItem} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
