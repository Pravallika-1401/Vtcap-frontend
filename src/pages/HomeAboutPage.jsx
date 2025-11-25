// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function HomeAboutPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [data, setData] = useState({
//     _id: "",
//     title: "",
//     subtitle: "",
//     content: "",
//     imageUrl: "",
//     imageFile: null,
//   });

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/about-home`);
//         setData((prev) => ({ ...prev, ...data }));
//       } catch {
//         // ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbout();
//   }, []);

//   const handleChange = (e) => {
//     setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setData((prev) => ({ ...prev, imageFile: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("subtitle", data.subtitle);
//       formData.append("content", data.content);
//       if (data.imageFile) formData.append("image", data.imageFile);

//       const url = data._id
//         ? `${API_BASE_URL}/api/about-home/${data._id}`
//         : `${API_BASE_URL}/api/about-home`;
//       const method = data._id ? "put" : "post";

//       const res = await axios[method](url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setData((prev) => ({ ...prev, ...res.data, imageFile: null }));
//       alert("Home about section saved");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="px-4 py-6">Loading...</div>;

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//         Home About Section
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={data.title}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Subtitle
//             </label>
//             <input
//               type="text"
//               name="subtitle"
//               value={data.subtitle}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Content
//           </label>
//           <textarea
//             name="content"
//             value={data.content}
//             onChange={handleChange}
//             rows={4}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 md:items-center">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
//             />
//           </div>
//           {data.imageUrl && (
//             <img
//               src={data.imageUrl}
//               alt="About"
//               className="h-24 w-full max-w-xs object-cover rounded-lg border border-slate-200"
//             />
//           )}
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save Section"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }






// import { useEffect, useState } from "react";
// import axios from "axios";

// const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function HomeAboutPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // ========== MAIN ABOUT ==========
//   const [about, setAbout] = useState({
//     _id: "",
//     title: "",
//     subtitle: "",
//     content: "",
//     imageUrl: "",
//     imageFile: null,
//   });

//   // ========== TRUSTED ==========
//   const [trusted, setTrusted] = useState([]);
//   const [trustedFile, setTrustedFile] = useState(null);

//   // ========== BRANDS ==========
//   const [brands, setBrands] = useState([]);
//   const [brandFile, setBrandFile] = useState(null);
//   const [brandName, setBrandName] = useState("");

//   // ================= LOAD ALL =================
//   useEffect(() => {
//     loadAll();
//   }, []);

//   async function loadAll() {
//     try {
//       const aboutRes = await axios.get(`${API}/api/about-home`);
//       const trustedRes = await axios.get(`${API}/api/trusted`);
//       const brandsRes = await axios.get(`${API}/api/brands`);

//       setAbout((prev) => ({ ...prev, ...aboutRes.data }));
//       setTrusted(trustedRes.data);
//       setBrands(brandsRes.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // ================= ABOUT SAVE =================
//   const handleAboutSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const fd = new FormData();
//       fd.append("title", about.title);
//       fd.append("subtitle", about.subtitle);
//       fd.append("content", about.content);
//       if (about.imageFile) fd.append("image", about.imageFile);

//       const res = await axios.put(`${API}/api/about-home`, fd, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setAbout((prev) => ({ ...prev, ...res.data, imageFile: null }));
//       alert("Saved Successfully!");
//     } catch (err) {
//       alert("Failed to save");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ================= TRUSTED UPLOAD =================
//   const uploadTrusted = async () => {
//     if (!trustedFile) return alert("Select an image");

//     const fd = new FormData();
//     fd.append("image", trustedFile);

//     await axios.post(`${API}/api/trusted`, fd, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });

//     setTrustedFile(null);
//     loadAll();
//   };

//   // ================= TRUSTED DELETE =================
//   const deleteTrusted = async (id) => {
//     await axios.delete(`${API}/api/trusted/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     loadAll();
//   };

//   // ================= BRAND UPLOAD =================
//   const uploadBrand = async () => {
//     if (!brandFile) return alert("Select Brand Image");

//     const fd = new FormData();
//     fd.append("name", brandName);
//     fd.append("image", brandFile);

//     await axios.post(`${API}/api/brands`, fd, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });

//     setBrandFile(null);
//     setBrandName("");
//     loadAll();
//   };

//   // ================= BRAND DELETE =================
//   const deleteBrand = async (id) => {
//     await axios.delete(`${API}/api/brands/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     loadAll();
//   };

//   if (loading) return <div className="p-6">Loading...</div>;

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-12">

//       {/* ========================= ABOUT SECTION ========================= */}
//       <section>
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//           Home About Section
//         </h1>

//         <form
//           onSubmit={handleAboutSave}
//           className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//         >
//           {/* FORM FIELDS */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 value={about.title}
//                 onChange={(e) =>
//                   setAbout((p) => ({ ...p, title: e.target.value }))
//                 }
//                 className="w-full border rounded-lg px-3 py-2"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">
//                 Subtitle
//               </label>
//               <input
//                 type="text"
//                 value={about.subtitle}
//                 onChange={(e) =>
//                   setAbout((p) => ({ ...p, subtitle: e.target.value }))
//                 }
//                 className="w-full border rounded-lg px-3 py-2"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Content
//             </label>
//             <textarea
//               value={about.content}
//               onChange={(e) =>
//                 setAbout((p) => ({ ...p, content: e.target.value }))
//               }
//               rows={4}
//               className="w-full border rounded-lg px-3 py-2"
//             />
//           </div>

//           {/* Image */}
//           <div className="flex flex-col md:flex-row items-center gap-4">
//             <input
//               type="file"
//               onChange={(e) =>
//                 setAbout((p) => ({ ...p, imageFile: e.target.files[0] }))
//               }
//             />
//             {about.imageUrl && (
//               <img
//                 src={about.imageUrl}
//                 className="h-24 rounded-lg border"
//                 alt=""
//               />
//             )}
//           </div>

//           <button
//             type="submit"
//             className="px-4 py-2 bg-slate-800 text-white rounded-lg"
//           >
//             {saving ? "Saving..." : "Save Section"}
//           </button>
//         </form>
//       </section>

//       {/* ========================= TRUSTED LOGOS ========================= */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3">Trusted By Logos</h2>

//         <div className="bg-white p-4 rounded-xl border shadow-sm">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <input
//               type="file"
//               onChange={(e) => setTrustedFile(e.target.files[0])}
//             />
//             <button
//               onClick={uploadTrusted}
//               className="bg-slate-900 text-white px-4 py-2 rounded-lg"
//             >
//               Upload
//             </button>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//             {trusted.map((t) => (
//               <div key={t._id} className="p-3 border rounded-lg text-center">
//                 <img
//                   src={t.imageUrl}
//                   className="h-14 mx-auto object-contain"
//                 />
//                 <button
//                   className="text-red-500 text-xs mt-2"
//                   onClick={() => deleteTrusted(t._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ========================= BRANDS ========================= */}
//       <section>
//         <h2 className="text-xl font-semibold mb-3">Authorized Distributor Logos</h2>

//         <div className="bg-white p-4 rounded-xl border shadow-sm">
//           <div className="flex flex-col sm:flex-row gap-4 mb-4">
//             <input
//               type="text"
//               placeholder="Brand Name"
//               value={brandName}
//               onChange={(e) => setBrandName(e.target.value)}
//               className="border px-3 py-2 rounded"
//             />

//             <input
//               type="file"
//               onChange={(e) => setBrandFile(e.target.files[0])}
//             />

//             <button
//               onClick={uploadBrand}
//               className="bg-slate-900 text-white px-4 py-2 rounded-lg"
//             >
//               Upload
//             </button>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//             {brands.map((b) => (
//               <div key={b._id} className="p-3 border rounded-lg text-center">
//                 <img
//                   src={b.imageUrl}
//                   className="h-14 mx-auto object-contain"
//                 />
//                 <p className="text-sm mt-1">{b.name}</p>
//                 <button
//                   className="text-red-500 text-xs mt-2"
//                   onClick={() => deleteBrand(b._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



// src/pages/HomeAboutPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";
import Input from "../components/Input";

export default function HomeAboutPage() {
  const [data, setData] = useState({ title: "", subtitle: "", content: "" });
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/about-home");
        if (res.data) {
          setData({
            title: res.data.title || "",
            subtitle: res.data.subtitle || "",
            content: res.data.content || "",
          });
          setPreview(res.data.imageUrl || "");
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onFile = (file, url) => {
    setImgFile(file);
    setPreview(url);
  };

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      if (imgFile) form.append("image", imgFile);
      form.append("title", data.title);
      form.append("subtitle", data.subtitle);
      form.append("content", data.content);

      const res = await axios.put("/about-home", form, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Updated");
      setData({ title: res.data.title, subtitle: res.data.subtitle, content: res.data.content });
      setPreview(res.data.imageUrl || preview);
    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Home — About Section</h2>
      <form onSubmit={submit} className="space-y-4">
        <ImageUpload onFileChange={onFile} existingPreview={preview} inputName="image" />
        <Input label="Title" name="title" value={data.title} onChange={handleChange} />
        <Input label="Subtitle" name="subtitle" value={data.subtitle} onChange={handleChange} />
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea name="content" value={data.content} onChange={handleChange} rows="6" className="w-full rounded p-3 border" />
        </div>
        <div><button disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? "Saving..." : "Save"}</button></div>
      </form>
    </div>
  );
}
