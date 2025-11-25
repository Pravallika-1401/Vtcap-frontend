// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [saving, setSaving] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     shortDescription: "",
//     longDescription: "",
//     category: "",
//     isFeatured: false,
//     imageFile: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setProduct((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setProduct((prev) => ({ ...prev, imageFile: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("name", product.name);
//       formData.append("shortDescription", product.shortDescription);
//       formData.append("longDescription", product.longDescription);
//       formData.append("category", product.category);
//       formData.append("isFeatured", product.isFeatured);
//       if (product.imageFile) formData.append("image", product.imageFile);

//       await axios.post(`${API_BASE_URL}/api/products`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       alert("Product created");
//       navigate("/products");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to create product");
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//         Add Product
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Product Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Category
//             </label>
//             <input
//               type="text"
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center gap-2 mt-2 md:mt-7">
//             <input
//               id="isFeatured"
//               type="checkbox"
//               name="isFeatured"
//               checked={product.isFeatured}
//               onChange={handleChange}
//               className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
//             />
//             <label
//               htmlFor="isFeatured"
//               className="text-sm font-medium text-slate-700"
//             >
//               Show on home products section
//             </label>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Short Description (for cards)
//           </label>
//           <textarea
//             name="shortDescription"
//             value={product.shortDescription}
//             onChange={handleChange}
//             rows={2}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Full Description (for product detail page)
//           </label>
//           <textarea
//             name="longDescription"
//             value={product.longDescription}
//             onChange={handleChange}
//             rows={5}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Product Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
//           />
//         </div>

//         <div className="flex justify-end gap-2">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 rounded-lg border border-slate-200 text-sm text-slate-700"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Create Product"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }







// src/pages/AddProduct.jsx
import React, { useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";

export default function AddProduct() {
  const [form, setForm] = useState({ name: "", slug: "", price: "", shortDescription: "", longDescription: "", category: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const onFile = (f, url) => { setFile(f); setPreview(url); };
  const change = (e) => setForm({...form, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      if (file) fd.append("image", file);
      Object.keys(form).forEach(k => fd.append(k, form[k]));
      await axios.post("/products", fd, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Created");
      setForm({ name: "", slug: "", price: "", shortDescription: "", longDescription: "", category: "" });
      setFile(null); setPreview("");
    } catch (err){ console.error(err); alert("Error"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={submit} className="space-y-3">
        <ImageUpload onFileChange={onFile} existingPreview={preview} inputName="image" />
        <input name="name" placeholder="Name" value={form.name} onChange={change} className="w-full p-2 border rounded"/>
        <input name="slug" placeholder="Slug" value={form.slug} onChange={change} className="w-full p-2 border rounded"/>
        <input name="price" placeholder="Price" value={form.price} onChange={change} className="w-full p-2 border rounded"/>
        <input name="category" placeholder="Category" value={form.category} onChange={change} className="w-full p-2 border rounded"/>
        <textarea name="shortDescription" placeholder="Short desc" value={form.shortDescription} onChange={change} className="w-full p-2 border rounded"/>
        <textarea name="longDescription" placeholder="Long desc" value={form.longDescription} onChange={change} className="w-full p-2 border rounded"/>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "Creating..." : "Create"}</button>
      </form>
    </div>
  );
}
