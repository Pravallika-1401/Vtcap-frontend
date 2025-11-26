// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-gray-900 text-white fixed top-0 left-0 p-5">
//       <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

//       <nav className="flex flex-col gap-4">
//         <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>

//         <Link to="/header" className="hover:text-yellow-300">Header</Link>
//         <Link to="/hero" className="hover:text-yellow-300">Hero Section</Link>
//         <Link to="/about-home" className="hover:text-yellow-300">Home About</Link>
//         <Link to="/about-page" className="hover:text-yellow-300">About Page</Link>

//         <Link to="/products" className="hover:text-yellow-300">Products</Link>
//         <Link to="/products/add" className="hover:text-yellow-300">Add Product</Link>
//         <Link to="/brands" className="hover:text-yellow-300">BrandsPage</Link>

//         <Link to="/gallery-home" className="hover:text-yellow-300">Home Gallery</Link>
//         <Link to="/gallery-full" className="hover:text-yellow-300">Full Gallery</Link>

//         <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
//         <Link to="/footer" className="hover:text-yellow-300">Footer</Link>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;




// import React from 'react';
// import { NavLink } from 'react-router-dom';


// const links = [
// { to: '/dashboard', label: 'Dashboard' },
// { to: '/header', label: 'Header' },
// { to: '/hero', label: 'Hero' },
// { to: '/about-home', label: 'Home About' },
// { to: '/about-page', label: 'About Page' },
// { to: '/products', label: 'Products' },
// { to: '/brands', label: 'Brands' },
// { to: '/gallery-home', label: 'Gallery Home' },
// { to: '/gallery-full', label: 'Gallery Full' },
// { to: '/contact', label: 'Contact' },
// { to: '/footer', label: 'Footer' }
// ];


// export default function Sidebar(){
// return (
// <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r p-4 hidden md:block">
// <div className="mb-6">
// <h3 className="text-xl font-bold">VTC Admin</h3>
// </div>


// <nav className="flex flex-col gap-1">
// {links.map((l) => (
// <NavLink key={l.to} to={l.to} className={({isActive}) => `px-3 py-2 rounded-md ${isActive ? 'bg-[#0b2343] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
// {l.label}
// </NavLink>
// ))}
// </nav>


// {/* Small-screen bottom nav */}
// <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
// {links.slice(0,5).map((l) => (
// <NavLink key={l.to} to={l.to} className={({isActive}) => `text-sm ${isActive ? 'text-[#0b2343]' : 'text-gray-600'}`}>
// {l.label}
// </NavLink>
// ))}
// </div>
// </aside>
// );
// }



// ===== Sidebar.jsx =====
// import React from "react";
// import { NavLink } from "react-router-dom";

// const links = [
//   { to: "/dashboard", label: "Dashboard" },
//   { to: "/header", label: "Header" },
//   { to: "/hero", label: "Hero" },
//   { to: "/about-home", label: "Home About" },
//   { to: "/about-page", label: "About Page" },
//   { to: "/products", label: "Products" },
//   { to: "/brands", label: "Brands" },
//   { to: "/gallery-home", label: "Gallery Home" },
//   { to: "/gallery-full", label: "Gallery Full" },
//   { to: "/contact", label: "Contact" },
//   { to: "/footer", label: "Footer" },
// ];

// export default function Sidebar() {
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside className="hidden md:flex flex-col gap-4 fixed left-0 top-0 h-full w-64 bg-white border-r p-4">
//         <h3 className="text-xl font-bold">VTC Admin</h3>

//         <nav className="flex flex-col gap-1">
//           {links.map((l) => (
//             <NavLink
//               key={l.to}
//               to={l.to}
//               className={({ isActive }) =>
//                 `px-3 py-2 rounded ${isActive ? "bg-[#0b2343] text-white" : "text-gray-700 hover:bg-gray-100"}`
//               }
//             >
//               {l.label}
//             </NavLink>
//           ))}
//         </nav>
//       </aside>

//       {/* Mobile Bottom Nav */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around">
//         {links.slice(0, 4).map((l) => (
//           <NavLink
//             key={l.to}
//             to={l.to}
//             className={({ isActive }) =>
//               `text-sm ${isActive ? "text-[#0b2343]" : "text-gray-600"}`
//             }
//           >
//             {l.label}
//           </NavLink>
//         ))}
//       </div>
//     </>
//   );
// }



import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/header", label: "Header" },
  { to: "/hero", label: "Hero" },
  { to: "/about-home", label: "Home About" },
  { to: "/about-page", label: "About Page" },
  { to: "/products", label: "Products" },
  { to: "/brands", label: "Brands" },
  { to: "/gallery-home", label: "Gallery Home" },
  { to: "/gallery-full", label: "Gallery Full" },
  { to: "/contact", label: "Contact" },
  { to: "/footer", label: "Footer" },
];

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-[#0b2343] text-white rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-64 bg-white border-r shadow-sm z-40 overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white z-10">
          <h3 className="text-2xl font-bold text-[#0b2343]">VTC Admin</h3>
          <p className="text-sm text-gray-500 mt-1">Management Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#0b2343] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <p className="text-xs text-gray-500 text-center">© 2025 VTC Corporation</p>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed left-0 top-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b sticky top-0 bg-white">
          <h3 className="text-2xl font-bold text-[#0b2343]">VTC Admin</h3>
          <p className="text-sm text-gray-500 mt-1">Management Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-[#0b2343] text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t">
          <p className="text-xs text-gray-500 text-center">© 2025 VTC Corporation</p>
        </div>
      </aside>
    </>
  );
}