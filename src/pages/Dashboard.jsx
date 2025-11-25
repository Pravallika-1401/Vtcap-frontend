// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     products: 0,
//     galleryImages: 0,
//     contactMessages: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // optional: create this endpoint in backend
//         const { data } = await axios.get(`${API_BASE_URL}/api/admin/stats`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setStats(data);
//       } catch {
//         // fallback dummy
//       }
//     };
//     fetchStats();
//   }, []);

//   const cards = [
//     { label: "Total Products", value: stats.products },
//     { label: "Gallery Images", value: stats.galleryImages },
//     { label: "Contact Messages", value: stats.contactMessages },
//   ];

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//         Dashboard
//       </h1>
//       <p className="text-sm text-slate-500 mb-6">
//         Quick overview of your website content.
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
//         {cards.map((card) => (
//           <div
//             key={card.label}
//             className="rounded-xl bg-white shadow-sm border border-slate-100 p-4 sm:p-5 flex flex-col justify-between"
//           >
//             <p className="text-sm font-medium text-slate-500">{card.label}</p>
//             <p className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-800">
//               {card.value}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






// import React, { useEffect, useState } from 'react';
// import axios from '../api/axiosConfig';


// export default function Dashboard(){
// const [counts, setCounts] = useState({ products:0, brands:0, gallery:0 });
// const [loading, setLoading] = useState(true);


// useEffect(() => {
// async function load(){
// try{
// const [pRes, bRes, gRes] = await Promise.all([
// axios.get('/products'),
// axios.get('/brands'),
// axios.get('/gallery')
// ]);
// setCounts({ products: pRes.data.length, brands: bRes.data.length, gallery: gRes.data.length });
// }catch(err){
// console.error('Dashboard fetch error', err);
// }
// setLoading(false);
// }
// load();
// },[]);


// return (
// <div className="min-h-[80vh]">
// <h1 className="text-2xl font-bold mb-6">Dashboard</h1>


// {loading ? (
// <p>Loading...</p>
// ) : (
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// <div className="bg-white rounded-lg shadow p-6">
// <p className="text-sm text-gray-500">Products</p>
// <p className="text-3xl font-bold">{counts.products}</p>
// </div>


// <div className="bg-white rounded-lg shadow p-6">
// <p className="text-sm text-gray-500">Brands</p>
// <p className="text-3xl font-bold">{counts.brands}</p>
// </div>


// <div className="bg-white rounded-lg shadow p-6">
// <p className="text-sm text-gray-500">Gallery Items</p>
// <p className="text-3xl font-bold">{counts.gallery}</p>
// </div>
// </div>
// )}


// <div className="mt-8">
// <h2 className="text-xl font-semibold mb-3">Quick actions</h2>
// <div className="flex flex-wrap gap-3">
// <a href="/products/add" className="px-4 py-2 bg-[#0b2343] text-white rounded">Add Product</a>
// <a href="/gallery-home" className="px-4 py-2 bg-[#008c94] text-white rounded">Manage Gallery</a>
// </div>
// </div>
// </div>
// );
// }




// ===== Dashboard.jsx =====
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";

export default function Dashboard() {
  const [counts, setCounts] = useState({ products: 0, brands: 0, gallery: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [p, b, g] = await Promise.all([
          axios.get("/products"),
          axios.get("/brands"),
          axios.get("/gallery"),
        ]);

        setCounts({
          products: p.data.length,
          brands: b.data.length,
          gallery: g.data.length,
        });
      } catch (err) {
        console.error("Dashboard Error", err);
      }
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Box label="Products" value={counts.products} />
        <Box label="Brands" value={counts.brands} />
        <Box label="Gallery Items" value={counts.gallery} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Quick actions</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/products/add" className="px-4 py-2 bg-[#0b2343] text-white rounded">
            Add Product
          </a>
          <a href="/gallery-home" className="px-4 py-2 bg-[#008c94] text-white rounded">
            Manage Gallery
          </a>
        </div>
      </div>
    </div>
  );
}

function Box({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

