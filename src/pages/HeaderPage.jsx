// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function HeaderPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [header, setHeader] = useState({
//     _id: "",
//     brandName: "",
//     tagline: "",
//     homeLabel: "Home",
//     aboutLabel: "About",
//     productsLabel: "Products",
//     galleryLabel: "Gallery",
//     contactLabel: "Contact",
//     logoUrl: "",
//     logoFile: null,
//   });

//   useEffect(() => {
//     const fetchHeader = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/header`);
//         setHeader((prev) => ({ ...prev, ...data }));
//       } catch {
//         // ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHeader();
//   }, []);

//   const handleChange = (e) => {
//     setHeader((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setHeader((prev) => ({ ...prev, logoFile: file }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try{
//       const formData = new FormData();
//       formData.append("brandName", header.brandName);
//       formData.append("tagline", header.tagline);
//       formData.append("homeLabel", header.homeLabel);
//       formData.append("aboutLabel", header.aboutLabel);
//       formData.append("productsLabel", header.productsLabel);
//       formData.append("galleryLabel", header.galleryLabel);
//       formData.append("contactLabel", header.contactLabel);
//       if (header.logoFile) formData.append("logo", header.logoFile);

//       const url = header._id
//         ? `${API_BASE_URL}/api/header/${header._id}`
//         : `${API_BASE_URL}/api/header`;
//       const method = header._id ? "put" : "post";

//       const { data } = await axios[method](url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setHeader((prev) => ({ ...prev, ...data, logoFile: null }));
//       alert("Header updated successfully");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save header");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return <div className="px-4 py-6">Loading header...</div>;
//   }

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//         Header Settings
//       </h1>
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Brand Name
//             </label>
//             <input
//               type="text"
//               name="brandName"
//               value={header.brandName}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Tagline
//             </label>
//             <input
//               type="text"
//               name="tagline"
//               value={header.tagline}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Nav labels */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {["homeLabel", "aboutLabel", "productsLabel", "galleryLabel", "contactLabel"].map(
//             (field) => (
//               <div key={field}>
//                 <label className="block text-sm font-medium text-slate-700 mb-1">
//                   {field.replace("Label", "")} Label
//                 </label>
//                 <input
//                   type="text"
//                   name={field}
//                   value={header[field]}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//                 />
//               </div>
//             )
//           )}
//         </div>

//         {/* Logo */}
//         <div className="flex flex-col sm:flex-row sm:items-center gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Logo Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
//             />
//           </div>
//           {header.logoUrl && (
//             <img
//               src={header.logoUrl}
//               alt="Logo preview"
//               className="h-16 w-16 object-contain rounded-lg border border-slate-200 bg-slate-50 mx-auto sm:mx-0"
//             />
//           )}
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 transition disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save Header"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }


// src/pages/HeaderPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";
import Input from "../components/Input";

export default function HeaderPage() {
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState({
    brandName: "",
    tagline: "",
    homeLabel: "Home",
    aboutLabel: "About",
    productsLabel: "Products",
    galleryLabel: "Gallery",
    contactLabel: "Contact",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadHeader();
  }, []);

  async function loadHeader() {
    try {
      const res = await axios.get("/header");
      if (res.data) {
        setHeader({
          brandName: res.data.brandName || "",
          tagline: res.data.tagline || "",
          homeLabel: res.data.homeLabel || "Home",
          aboutLabel: res.data.aboutLabel || "About",
          productsLabel: res.data.productsLabel || "Products",
          galleryLabel: res.data.galleryLabel || "Gallery",
          contactLabel: res.data.contactLabel || "Contact",
        });
        setPreview(res.data.logoUrl || "");
      }
    } catch (err) {
      console.error("Load header:", err);
    }
  }

  const handleChange = (e) => {
    setHeader({ ...header, [e.target.name]: e.target.value });
  };

  const handleLogo = (file, previewUrl) => {
    setLogoFile(file);
    setPreview(previewUrl);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      if (logoFile) form.append("logo", logoFile);
      form.append("brandName", header.brandName);
      form.append("tagline", header.tagline);
      form.append("homeLabel", header.homeLabel);
      form.append("aboutLabel", header.aboutLabel);
      form.append("productsLabel", header.productsLabel);
      form.append("galleryLabel", header.galleryLabel);
      form.append("contactLabel", header.contactLabel);

      const res = await axios.put("/header", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setHeader({
        brandName: res.data.brandName || "",
        tagline: res.data.tagline || "",
        homeLabel: res.data.homeLabel,
        aboutLabel: res.data.aboutLabel,
        productsLabel: res.data.productsLabel,
        galleryLabel: res.data.galleryLabel,
        contactLabel: res.data.contactLabel,
      });
      setPreview(res.data.logoUrl || preview);
      alert("Header updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Header</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Logo</label>
          <ImageUpload onFileChange={handleLogo} existingPreview={preview} inputName="logo" />
        </div>

        <Input label="Brand Name" name="brandName" value={header.brandName} onChange={handleChange} />
        <Input label="Tagline" name="tagline" value={header.tagline} onChange={handleChange} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Home Label" name="homeLabel" value={header.homeLabel} onChange={handleChange} />
          <Input label="About Label" name="aboutLabel" value={header.aboutLabel} onChange={handleChange} />
          <Input label="Products Label" name="productsLabel" value={header.productsLabel} onChange={handleChange} />
          <Input label="Gallery Label" name="galleryLabel" value={header.galleryLabel} onChange={handleChange} />
          <Input label="Contact Label" name="contactLabel" value={header.contactLabel} onChange={handleChange} />
        </div>

        <div className="flex gap-2">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Saving..." : "Save Header"}
          </button>
        </div>
      </form>
    </div>
  );
}
