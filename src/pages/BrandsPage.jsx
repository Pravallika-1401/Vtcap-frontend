// adminpanel-frontend/src/pages/BrandsPage.jsx

// import { useEffect, useState } from "react";
// import axios from "../api/axiosConfig";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


// const emptyBrand = {
//   name: "",
//   slug: "",
//   tagline: "",
//   heroTitle: "",
//   heroSubtitle: "",
//   aboutTitle: "",
//   aboutText: "",
//   offerTitle: "",
//   offerText: "",
//   productRange: "", // comma separated in UI, array in backend
//   order: "",
//   isActive: true,
// };

// export default function BrandsPage() {
//   const [brands, setBrands] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [form, setForm] = useState(emptyBrand);
//   const [logoFile, setLogoFile] = useState(null);
//   const [bannerFile, setBannerFile] = useState(null);
//   const [logoPreview, setLogoPreview] = useState(null);
//   const [bannerPreview, setBannerPreview] = useState(null);

//   // ======== API helpers =========
//   const authHeaders = () => ({
//     Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//   });

//   const fetchBrands = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get("/api/brands", {
//         headers: authHeaders(),
//       });
//       setBrands(data || []);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to load brands");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBrands();
//   }, []);

//   // ======== Form handlers =========
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleLogoChange = (e) => {
//     const file = e.target.files?.[0];
//     setLogoFile(file || null);
//     if (file) {
//       setLogoPreview(URL.createObjectURL(file));
//     } else {
//       setLogoPreview(null);
//     }
//   };

//   const handleBannerChange = (e) => {
//     const file = e.target.files?.[0];
//     setBannerFile(file || null);
//     if (file) {
//       setBannerPreview(URL.createObjectURL(file));
//     } else {
//       setBannerPreview(null);
//     }
//   };

//   const resetForm = () => {
//     setForm(emptyBrand);
//     setLogoFile(null);
//     setBannerFile(null);
//     setLogoPreview(null);
//     setBannerPreview(null);
//     setEditingId(null);
//   };

//   const handleEdit = (brand) => {
//     setEditingId(brand._id);
//     setForm({
//       name: brand.name || "",
//       slug: brand.slug || "",
//       tagline: brand.tagline || "",
//       heroTitle: brand.heroTitle || "",
//       heroSubtitle: brand.heroSubtitle || "",
//       aboutTitle: brand.aboutTitle || "",
//       aboutText: brand.aboutText || "",
//       offerTitle: brand.offerTitle || "",
//       offerText: brand.offerText || "",
//       productRange: (brand.productRange || []).join(", "),
//       order: brand.order ?? "",
//       isActive: brand.isActive ?? true,
//     });
//     setLogoPreview(brand.logoUrl || null);
//     setBannerPreview(brand.bannerUrl || null);
//     setLogoFile(null);
//     setBannerFile(null);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this brand page?")) return;
//     try {
//       await axios.delete(`/api/brands/${id}`, { headers: authHeaders() });
//       setBrands((prev) => prev.filter((b) => b._id !== id));
//       if (editingId === id) resetForm();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to delete brand");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const fd = new FormData();

//       fd.append("name", form.name);
//       fd.append("slug", form.slug);
//       fd.append("tagline", form.tagline);
//       fd.append("heroTitle", form.heroTitle);
//       fd.append("heroSubtitle", form.heroSubtitle);
//       fd.append("aboutTitle", form.aboutTitle);
//       fd.append("aboutText", form.aboutText);
//       fd.append("offerTitle", form.offerTitle);
//       fd.append("offerText", form.offerText);
//       fd.append(
//         "productRange",
//         JSON.stringify(
//           form.productRange
//             .split(",")
//             .map((s) => s.trim())
//             .filter(Boolean)
//         )
//       );
//       fd.append("order", form.order || 0);
//       fd.append("isActive", form.isActive ? "true" : "false");

//       if (logoFile) fd.append("logo", logoFile);
//       if (bannerFile) fd.append("banner", bannerFile);

//       const config = {
//         headers: {
//           ...authHeaders(),
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       if (editingId) {
//         await axios.put(`/api/brands/${editingId}`, fd, config);
//         alert("Brand updated");
//       } else {
//         await axios.post("/api/brands", fd, config);
//         alert("Brand created");
//       }

//       resetForm();
//       await fetchBrands();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to save brand");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ======== UI =========
//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
//             Brand Pages
//           </h1>
//           <p className="text-sm text-slate-500">
//             Manage all 11 brand pages shown on the main website. Any changes
//             here will reflect on the live brand pages.
//           </p>
//         </div>
//         {editingId && (
//           <button
//             type="button"
//             onClick={resetForm}
//             className="self-start sm:self-auto inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
//           >
//             + New Brand
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* ====== Brand list ====== */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-5 lg:col-span-1">
//           <div className="flex items-center justify-between mb-3">
//             <h2 className="text-sm font-semibold text-slate-700">
//               All Brands
//             </h2>
//             {loading && (
//               <span className="text-xs text-slate-400">Loading...</span>
//             )}
//           </div>

//           {brands.length === 0 && !loading ? (
//             <p className="text-xs text-slate-500">
//               No brands created yet. Use the form to add the first brand page.
//             </p>
//           ) : (
//             <div className="overflow-x-auto -mx-2 sm:mx-0">
//               <table className="min-w-full text-left text-xs sm:text-sm">
//                 <thead>
//                   <tr className="border-b border-slate-100 text-slate-500">
//                     <th className="px-2 py-2 font-medium">Brand</th>
//                     <th className="px-2 py-2 font-medium hidden sm:table-cell">
//                       Slug
//                     </th>
//                     <th className="px-2 py-2 font-medium text-center">
//                       Active
//                     </th>
//                     <th className="px-2 py-2 font-medium text-right">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {brands.map((brand) => (
//                     <tr
//                       key={brand._id}
//                       className="border-b border-slate-50 hover:bg-slate-50/60"
//                     >
//                       <td className="px-2 py-2">
//                         <div className="flex items-center gap-2">
//                           {brand.logoUrl && (
//                             <img
//                               src={brand.logoUrl}
//                               alt={brand.name}
//                               className="h-6 w-6 rounded object-contain bg-slate-50 border border-slate-100"
//                             />
//                           )}
//                           <span className="font-medium text-slate-800">
//                             {brand.name}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-2 py-2 hidden sm:table-cell text-slate-500">
//                         {brand.slug}
//                       </td>
//                       <td className="px-2 py-2 text-center">
//                         <span
//                           className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${
//                             brand.isActive
//                               ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
//                               : "bg-slate-50 text-slate-500 border border-slate-100"
//                           }`}
//                         >
//                           {brand.isActive ? "Active" : "Hidden"}
//                         </span>
//                       </td>
//                       <td className="px-2 py-2 text-right space-x-1">
//                         <button
//                           onClick={() => handleEdit(brand)}
//                           className="text-[11px] px-2 py-1 rounded border border-slate-200 text-slate-700 hover:bg-slate-100"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(brand._id)}
//                           className="text-[11px] px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50"
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* ====== Brand form ====== */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 lg:col-span-2">
//           <h2 className="text-sm font-semibold text-slate-700 mb-4">
//             {editingId ? "Edit Brand Page" : "Add New Brand Page"}
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Basic info */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-1">
//                   Brand Name
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-1">
//                   Slug (URL)
//                 </label>
//                 <input
//                   type="text"
//                   name="slug"
//                   value={form.slug}
//                   onChange={handleChange}
//                   placeholder="schneider-electric"
//                   required
//                   className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-xs font-medium text-slate-600 mb-1">
//                   Tagline (small text near brand name)
//                 </label>
//                 <input
//                   type="text"
//                   name="tagline"
//                   value={form.tagline}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 />
//               </div>
//             </div>

//             {/* Hero section */}
//             <div>
//               <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
//                 Hero Section
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1">
//                     Hero Title
//                   </label>
//                   <input
//                     type="text"
//                     name="heroTitle"
//                     value={form.heroTitle}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-slate-600 mb-1">
//                     Hero Subtitle
//                   </label>
//                   <input
//                     type="text"
//                     name="heroSubtitle"
//                     value={form.heroSubtitle}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* About / Offer */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
//                   About Section
//                 </h3>
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     name="aboutTitle"
//                     placeholder="About Schneider Electric"
//                     value={form.aboutTitle}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                   />
//                   <textarea
//                     name="aboutText"
//                     rows={4}
//                     value={form.aboutText}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
//                   What We Offer Section
//                 </h3>
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     name="offerTitle"
//                     placeholder="What We Offer"
//                     value={form.offerTitle}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                   />
//                   <textarea
//                     name="offerText"
//                     rows={4}
//                     value={form.offerText}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Product range */}
//             <div>
//               <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
//                 Product Range (cards)
//               </h3>
//               <label className="block text-xs text-slate-500 mb-1">
//                 Enter each item separated by commas. Example:{" "}
//                 <span className="font-mono text-[11px]">
//                   MCB, RCCB, Distribution Boards, Switches, Electrical Panels
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 name="productRange"
//                 value={form.productRange}
//                 onChange={handleChange}
//                 className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//               />
//             </div>

//             {/* Images + settings */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
//               <div className="space-y-2">
//                 <label className="block text-xs font-medium text-slate-600 mb-1">
//                   Logo Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleLogoChange}
//                   className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-slate-100 hover:file:bg-slate-200"
//                 />
//                 {logoPreview && (
//                   <img
//                     src={logoPreview}
//                     alt="Logo preview"
//                     className="mt-2 h-12 w-auto rounded border border-slate-200 bg-slate-50 object-contain"
//                   />
//                 )}
//               </div>

//               <div className="space-y-2 lg:col-span-2">
//                 <label className="block text-xs font-medium text-slate-600 mb-1">
//                   Hero / Banner Image
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleBannerChange}
//                   className="block w-full text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-slate-100 hover:file:bg-slate-200"
//                 />
//                 {bannerPreview && (
//                   <img
//                     src={bannerPreview}
//                     alt="Banner preview"
//                     className="mt-2 h-32 w-full rounded border border-slate-200 bg-slate-50 object-cover"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Order + active */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//               <div>
//                 <label className="block text-xs font-medium text-slate-600 mb-1">
//                   Display Order (1 – 11)
//                 </label>
//                 <input
//                   type="number"
//                   name="order"
//                   value={form.order}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
//                 />
//               </div>
//               <div className="flex items-center gap-2 md:col-span-2">
//                 <input
//                   id="isActive"
//                   type="checkbox"
//                   name="isActive"
//                   checked={form.isActive}
//                   onChange={handleChange}
//                   className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
//                 />
//                 <label
//                   htmlFor="isActive"
//                   className="text-xs font-medium text-slate-700"
//                 >
//                   Show this brand page on the website
//                 </label>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex items-center justify-end gap-3 pt-2">
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
//               >
//                 Reset
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//               >
//                 {saving
//                   ? editingId
//                     ? "Updating..."
//                     : "Creating..."
//                   : editingId
//                   ? "Save Changes"
//                   : "Create Brand"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }





// src/pages/BrandsPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";
import Input from "../components/Input";

export default function BrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", aboutText: "", offerText: "", products: "" });
  const [hero, setHero] = useState({ file: null, preview: "" });

  useEffect(()=>{ loadBrands(); }, []);
  async function loadBrands() {
    try { const res = await axios.get("/brands"); setBrands(res.data || []); } catch (err) { console.error(err); }
  }

  const onFile = (file, url) => setHero({ file, preview: url });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function createBrand(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const fd = new FormData();
      if (hero.file) fd.append("heroImage", hero.file);
      fd.append("name", form.name);
      fd.append("slug", form.slug);
      fd.append("aboutText", form.aboutText);
      fd.append("offerText", form.offerText);
      // products as comma separated
      fd.append("products", JSON.stringify((form.products || "").split(",").map(x => x.trim()).filter(Boolean)));
      await axios.post("/brands", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setForm({ name: "", slug: "", aboutText: "", offerText: "", products: "" });
      setHero({ file: null, preview: "" });
      await loadBrands();
      alert("Brand created");
    } catch (err) { console.error(err); alert("Error"); }
    finally { setLoading(false); }
  }

  async function removeBrand(id) {
    if (!confirm("Delete brand?")) return;
    try { await axios.delete(`/brands/${id}`); await loadBrands(); } catch (err) { console.error(err); }
  }

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Brands</h2>
      <form onSubmit={createBrand} className="space-y-3">
        <ImageUpload onFileChange={onFile} existingPreview={hero.preview} inputName="heroImage" />
        <Input label="Name" name="name" value={form.name} onChange={change} />
        <Input label="Slug (unique)" name="slug" value={form.slug} onChange={change} />
        <Input label="Offer Text" name="offerText" value={form.offerText} onChange={change} />
        <div>
          <label className="block mb-1">Products (comma separated)</label>
          <input name="products" value={form.products} onChange={change} className="w-full p-2 border rounded" />
        </div>
        <button disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">{loading ? "Creating..." : "Create Brand"}</button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        {brands.map(b => (
          <div key={b._id} className="border rounded overflow-hidden p-2">
            <img src={b.heroImage} alt={b.name} className="w-full h-28 object-cover rounded"/>
            <h4 className="font-semibold mt-2">{b.name}</h4>
            <p className="text-xs text-gray-500">{b.slug}</p>
            <div className="flex gap-2 mt-2">
              <button onClick={()=>removeBrand(b._id)} className="px-2 py-1 bg-red-600 text-white text-xs rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
