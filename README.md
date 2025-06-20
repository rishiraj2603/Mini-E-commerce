# AMRR Project

A modern React + Vite web application for managing and viewing items, styled with Tailwind CSS and featuring a modal for item details.

## Features

- **View Items**: Browse all items with their name and cover image. Click any item to view full details and images in a modal with a carousel.
- **Add Item**: Add new items with name, type, description, cover image, and additional images. Form validation and success feedback included.
- **Responsive UI**: Built with Tailwind CSS for a clean, responsive design.
- **Modal Details**: Uses [react-modal](https://www.npmjs.com/package/react-modal) for accessible, animated modals.
- **Persistent Data**: Items are stored in localStorage so your data persists across reloads.

## Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-modal](https://www.npmjs.com/package/react-modal)

## Getting Started

1. Clone the repository :https://github.com/rishiraj2603/Mini-E-commerce

2. Install dependencies: npm i

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure

- `src/pages/ViewItems.jsx` — View all items and see details in a modal
- `src/pages/AddItem.jsx` — Add new items with a form
- `src/App.jsx` — Main app with routing and navigation
- `src/index.css` — Tailwind CSS entry point
- `src/context/ItemContext.jsx` — (Legacy, not used in main flow)

## Customization

- Update the initial items or item types in the code as needed.
- Tailwind CSS classes can be changed for your preferred look.

## License

MIT
