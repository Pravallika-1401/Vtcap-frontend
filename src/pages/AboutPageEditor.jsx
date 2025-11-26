// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function AboutPageEditor() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [data, setData] = useState({
//     _id: "",
//     pageTitle: "",
//     heroText: "",
//     mainContent: "",
//     imageUrl: "",
//     imageFile: null,
//   });

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/about-page`);
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
//       formData.append("pageTitle", data.pageTitle);
//       formData.append("heroText", data.heroText);
//       formData.append("mainContent", data.mainContent);
//       if (data.imageFile) formData.append("image", data.imageFile);

//       const url = data._id
//         ? `${API_BASE_URL}/api/about-page/${data._id}`
//         : `${API_BASE_URL}/api/about-page`;
//       const method = data._id ? "put" : "post";

//       const res = await axios[method](url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setData((prev) => ({ ...prev, ...res.data, imageFile: null }));
//       alert("About page content saved");
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
//         About Page Content
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Page Title
//           </label>
//           <input
//             type="text"
//             name="pageTitle"
//             value={data.pageTitle}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Hero Text / Short Intro
//           </label>
//           <textarea
//             name="heroText"
//             value={data.heroText}
//             onChange={handleChange}
//             rows={3}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Main Content
//           </label>
//           <textarea
//             name="mainContent"
//             value={data.mainContent}
//             onChange={handleChange}
//             rows={6}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 md:items-center">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Main Image
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
//               alt="About page"
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
//             {saving ? "Saving..." : "Save Content"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// src/pages/AboutPageEditor.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";
import Input from "../components/Input";

export default function AboutPageEditor() {
  const [data, setData] = useState({ pageTitle: "", heroText: "", mainContent: "" });
  const [imgFile, setImgFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/about-page");
        if (res.data) {
          setData({
            pageTitle: res.data.pageTitle || "",
            heroText: res.data.heroText || "",
            mainContent: res.data.mainContent || "",
          });
          setPreview(res.data.imageUrl || "");
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const onFile = (file, url) => { setImgFile(file); setPreview(url); };
  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      if (imgFile) form.append("image", imgFile);
      form.append("pageTitle", data.pageTitle);
      form.append("heroText", data.heroText);
      form.append("mainContent", data.mainContent);

      const res = await axios.put("/about-page", form, { headers: { "Content-Type": "multipart/form-data" } });
      alert("About Page updated");
      setData({ pageTitle: res.data.pageTitle, heroText: res.data.heroText, mainContent: res.data.mainContent });
      setPreview(res.data.imageUrl || preview);
    } catch (err) { console.error(err); alert("Error"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit About Page</h2>
      <form onSubmit={submit} className="space-y-4">
        <ImageUpload onFileChange={onFile} existingPreview={preview} inputName="image" />
        <Input label="Page Title" name="pageTitle" value={data.pageTitle} onChange={handleChange} />
        <Input label="Hero Text" name="heroText" value={data.heroText} onChange={handleChange} />
        <div>
          <label className="block text-sm font-medium mb-1">Main Content</label>
          <textarea name="mainContent" value={data.mainContent} onChange={handleChange} rows="8" className="w-full rounded p-3 border" />
        </div>
        <div><button disabled={loading} className="px-4 py-2 bg-emerald-600 text-white rounded">{loading ? "Saving..." : "Save"}</button></div>
      </form>
    </div>
  );
}
