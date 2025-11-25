// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [product, setProduct] = useState({
//     name: "",
//     shortDescription: "",
//     longDescription: "",
//     category: "",
//     isFeatured: false,
//     imageUrl: "",
//     imageFile: null,
//   });

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/products/${id}`);
//         setProduct((prev) => ({ ...prev, ...data }));
//       } catch (err) {
//         alert(err.response?.data?.message || "Failed to load product");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

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

//       await axios.put(`${API_BASE_URL}/api/products/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       alert("Product updated");
//       navigate("/products");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update product");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="px-4 py-6">Loading...</div>;

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//         Edit Product
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
//             Short Description
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
//             Full Description
//           </label>
//           <textarea
//             name="longDescription"
//             value={product.longDescription}
//             onChange={handleChange}
//             rows={5}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 md:items-center">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Product Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
//             />
//           </div>
//           {product.imageUrl && (
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="h-24 w-full max-w-xs object-cover rounded-lg border border-slate-200"
//             />
//           )}
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
//             {saving ? "Saving..." : "Update Product"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// useEffect(() => {
// async function load(){
// try{
// // backend does not expose GET by id; fetch all and find by _id
// const res = await axios.get('/products');
// const found = res.data.find(p => p._id === id || p.id === id);
// if(!found) return setProduct(null);
// setProduct(found);
// setForm({
// name: found.name || '',
// slug: found.slug || '',
// category: found.category || '',
// price: found.price || '',
// shortDescription: found.shortDescription || '',
// longDescription: found.longDescription || ''
// });
// }catch(err){
// console.error('fetch product error', err);
// }
// setLoading(false);
// }
// load();
// },[id]);


// const handleChange = (e) => setForm(prev=>({...prev,[e.target.name]: e.target.value}));


// const handleImageSelect = (file) => setImageFile(file);


// const handleSubmit = async (e) => {
// e.preventDefault();
// try{
// const fd = new FormData();
// Object.keys(form).forEach(k => fd.append(k, form[k]));
// if (imageFile) fd.append('image', imageFile);
// await axios.put(`/products/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
// navigate('/products');
// }catch(err){
// console.error('update error', err);
// }
// };


// if (loading) return <p>Loading...</p>;
// if (!product) return <p>Product not found</p>;


// return (
// <div className="max-w-3xl bg-white rounded p-6 shadow">
// <h2 className="text-xl font-bold mb-4">Edit Product</h2>
// <form onSubmit={handleSubmit} className="space-y-4">
// <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" className="w-full p-2 border rounded" />
// <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (unique)" className="w-full p-2 border rounded" />
// <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded" />
// <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded" />
// <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} rows={3} placeholder="Short description" className="w-full p-2 border rounded" />
// <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows={6} placeholder="Long description" className="w-full p-2 border rounded" />


// <div>
// <label className="block text-sm font-medium mb-2">Replace image (optional)</label>
// <input type="file" accept="image/*" onChange={(e)=> setImageFile(e.target.files[0])} />
// </div>


// <div className="flex gap-3">
// <button className="px-4 py-2 bg-[#0b2343] text-white rounded">Save</button>
// <button type="button" onClick={()=> navigate('/products')} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
// </div>
// </form>
// </div>
// );





// ===== EditProduct.jsx =====
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    category: "",
    price: "",
    shortDescription: "",
    longDescription: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/products/${id}`);
        const p = res.data;

        setForm({
          name: p.name,
          slug: p.slug,
          category: p.category,
          price: p.price,
          shortDescription: p.shortDescription,
          longDescription: p.longDescription,
        });
      } catch (err) {
        console.error("Product load error", err);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.keys(form).forEach((k) => fd.append(k, form[k]));
      if (image) fd.append("image", image);

      await axios.put(`/products/${id}`, fd);
      navigate("/products");
    } catch (err) {
      console.error("Update error", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl bg-white rounded p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="slug" value={form.slug} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} className="w-full p-2 border rounded" />
        <textarea name="longDescription" value={form.longDescription} onChange={handleChange} className="w-full p-2 border rounded" />

        <div>
          <label className="block text-sm font-medium mb-2">Replace Image (optional)</label>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-[#0b2343] text-white rounded">Save</button>
          <button
            type="button"
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-gray-100 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
