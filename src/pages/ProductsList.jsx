// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function ProductsList() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = async () => {
//     try {
//       const { data } = await axios.get(`${API_BASE_URL}/api/products`);
//       setProducts(data);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to load products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;

//     try {
//       await axios.delete(`${API_BASE_URL}/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setProducts((prev) => prev.filter((p) => p._id !== id));
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to delete");
//     }
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
//           Products
//         </h1>
//         <Link
//           to="/products/new"
//           className="inline-flex items-center justify-center rounded-lg bg-slate-800 text-white text-sm font-medium px-4 py-2 hover:bg-slate-900"
//         >
//           + Add Product
//         </Link>
//       </div>

//       {loading ? (
//         <p>Loading products...</p>
//       ) : products.length === 0 ? (
//         <p className="text-sm text-slate-500">No products found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-100">
//           <table className="min-w-full text-sm">
//             <thead className="bg-slate-50">
//               <tr>
//                 <th className="px-3 py-2 text-left font-medium text-slate-600">
//                   Image
//                 </th>
//                 <th className="px-3 py-2 text-left font-medium text-slate-600">
//                   Name
//                 </th>
//                 <th className="px-3 py-2 text-left font-medium text-slate-600">
//                   Category
//                 </th>
//                 <th className="px-3 py-2 text-left font-medium text-slate-600">
//                   Featured
//                 </th>
//                 <th className="px-3 py-2 text-right font-medium text-slate-600">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr key={p._id} className="border-t border-slate-100">
//                   <td className="px-3 py-2">
//                     {p.imageUrl && (
//                       <img
//                         src={p.imageUrl}
//                         alt={p.name}
//                         className="h-10 w-10 rounded object-cover"
//                       />
//                     )}
//                   </td>
//                   <td className="px-3 py-2">{p.name}</td>
//                   <td className="px-3 py-2">{p.category}</td>
//                   <td className="px-3 py-2">
//                     {p.isFeatured ? (
//                       <span className="inline-flex px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs">
//                         Featured
//                       </span>
//                     ) : (
//                       <span className="text-xs text-slate-500">No</span>
//                     )}
//                   </td>
//                   <td className="px-3 py-2 text-right space-x-2">
//                     <Link
//                       to={`/products/${p._id}/edit`}
//                       className="text-xs font-medium text-slate-700 hover:underline"
//                     >
//                       Edit
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className="text-xs font-medium text-red-600 hover:underline"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }





// src/pages/ProductsList.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{ load(); }, []);
  async function load() {
    try { const res = await axios.get("/products"); setProducts(res.data || []); } catch (err){ console.error(err); }
  }
  async function remove(id) {
    if (!confirm("Delete product?")) return;
    try { await axios.delete(`/products/${id}`); await load(); } catch (err){ console.error(err); }
  }
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link to="/products/add" className="px-3 py-2 bg-blue-600 text-white rounded">Add Product</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(p=>(
          <div key={p._id} className="border rounded p-3">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded"/>
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-sm text-gray-600">{p.shortDescription}</p>
            <div className="flex gap-2 mt-2">
              <Link to={`/products/${p._id}/edit`} className="px-2 py-1 text-sm bg-yellow-500 text-white rounded">Edit</Link>
              <button onClick={()=>remove(p._id)} className="px-2 py-1 text-sm bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
