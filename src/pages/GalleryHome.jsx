// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function GalleryHome() {
//   const [items, setItems] = useState([]);
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const fetchGallery = async () => {
//     try {
//       const { data } = await axios.get(`${API_BASE_URL}/api/gallery`);
//       // assuming model has isFeatured, home should show those 8
//       setItems(data.filter((img) => img.isFeatured).slice(0, 8));
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to load gallery");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   const handleToggle = async (id) => {
//     setSaving(true);
//     try {
//       await axios.patch(
//         `${API_BASE_URL}/api/gallery/${id}/toggle-featured`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       await fetchGallery();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="px-4 py-6">Loading...</div>;

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
//           Home Gallery (Featured 8)
//         </h1>
//         <p className="text-xs sm:text-sm text-slate-500">
//           Choose which images should appear in the home page gallery section.
//         </p>
//       </div>

//       {items.length === 0 ? (
//         <p className="text-sm text-slate-500">
//           No featured images yet. Mark some images as featured from full gallery
//           page.
//         </p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           {items.map((img) => (
//             <div
//               key={img._id}
//               className="relative bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
//             >
//               <img
//                 src={img.imageUrl}
//                 alt={img.title}
//                 className="h-32 sm:h-40 w-full object-cover"
//               />
//               <div className="p-2 flex items-center justify-between gap-2">
//                 <p className="text-xs font-medium text-slate-700 truncate">
//                   {img.title || "Gallery item"}
//                 </p>
//                 <button
//                   disabled={saving}
//                   onClick={() => handleToggle(img._id)}
//                   className="text-[10px] px-2 py-1 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-60"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }






// src/pages/GalleryHome.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";

export default function GalleryHome() {
  const [items, setItems] = useState([]);
  const [fileData, setFileData] = useState({ file: null, preview: "" });
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadGallery(); }, []);
  async function loadGallery() {
    try { const res = await axios.get("/gallery"); setItems(res.data || []); } catch (err) { console.error(err); }
  }

  const onFile = (file, url) => setFileData({ file, preview: url });

  async function addImage(e) {
    e.preventDefault();
    if (!fileData.file) return alert("Select image");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("image", fileData.file);
      // form.append("title", title);
      form.append("title", title || "Untitled");
      // form.append("category", category || "Default");
      form.append("category", category || "Default");
      await axios.post("/gallery", form, { headers: { "Content-Type": "multipart/form-data" } });
      setTitle(""); setCategory(""); setFileData({ file: null, preview: "" });
      await loadGallery();
      alert("Added");
    } catch (err) { console.error(err); alert("Error"); }
    finally { setLoading(false); }
  }

  async function removeItem(id) {
    if (!confirm("Delete image?")) return;
    try { await axios.delete(`/gallery/${id}`); await loadGallery(); } catch (err) { console.error(err); }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Gallery - Manage</h2>
      <form onSubmit={addImage} className="space-y-3">
        <ImageUpload onFileChange={onFile} existingPreview={fileData.preview} inputName="image" />
        <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded"/>
        <input value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Category" className="w-full p-2 border rounded"/>
        <button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">{loading ? "Uploading..." : "Add Image"}</button>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
        {items.map(it => (
          <div key={it._id} className="relative rounded overflow-hidden border">
            <img src={it.image || it.imageUrl} alt={it.title} className="w-full h-36 object-cover"/>
            <div className="p-2">
              <h4 className="font-semibold text-sm">{it.title}</h4>
              <p className="text-xs text-gray-500">{it.category}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={()=>removeItem(it._id)} className="text-xs px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
