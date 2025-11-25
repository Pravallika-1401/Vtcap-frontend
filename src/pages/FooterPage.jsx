// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function FooterPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [data, setData] = useState({
//     _id: "",
//     copyrightText: "",
//     facebook: "",
//     instagram: "",
//     linkedin: "",
//   });

//   useEffect(() => {
//     const fetchFooter = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/footer`);
//         setData((prev) => ({ ...prev, ...data }));
//       } catch {
//         // ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFooter();
//   }, []);

//   const handleChange = (e) => {
//     setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const url = data._id
//         ? `${API_BASE_URL}/api/footer/${data._id}`
//         : `${API_BASE_URL}/api/footer`;
//       const method = data._id ? "put" : "post";

//       const res = await axios[method](url, data, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       setData((prev) => ({ ...prev, ...res.data }));
//       alert("Footer updated");
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
//         Footer Settings
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Copyright Text
//           </label>
//           <input
//             type="text"
//             name="copyrightText"
//             value={data.copyrightText}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             placeholder="© 2025 VTC Corporation. All rights reserved."
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Facebook URL
//             </label>
//             <input
//               type="text"
//               name="facebook"
//               value={data.facebook}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Instagram URL
//             </label>
//             <input
//               type="text"
//               name="instagram"
//               value={data.instagram}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               LinkedIn URL
//             </label>
//             <input
//               type="text"
//               name="linkedin"
//               value={data.linkedin}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save Footer"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }




// src/pages/FooterPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Input from "../components/Input";

export default function FooterPage() {
  const [footer, setFooter] = useState({ copyrightText: "", facebook: "", instagram: "", linkedin: "" });
  useEffect(()=>{ (async ()=>{ try{ const res = await axios.get("/footer"); if (res.data) setFooter(res.data); }catch(e){console.error(e);} })(); }, []);

  const change = (e) => setFooter({ ...footer, [e.target.name]: e.target.value });

  async function save(e) {
    e.preventDefault();
    try {
      const res = await axios.put("/footer", footer);
      setFooter(res.data);
      alert("Footer updated");
    } catch (err) { console.error(err); alert("Error"); }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Footer Settings</h2>
      <form onSubmit={save} className="space-y-3">
        <Input label="Copyright Text" name="copyrightText" value={footer.copyrightText || ""} onChange={change} />
        <Input label="Facebook URL" name="facebook" value={footer.facebook || ""} onChange={change} />
        <Input label="Instagram URL" name="instagram" value={footer.instagram || ""} onChange={change} />
        <Input label="LinkedIn URL" name="linkedin" value={footer.linkedin || ""} onChange={change} />
        <button className="px-4 py-2 bg-sky-600 text-white rounded">Save Footer</button>
      </form>
    </div>
  );
}
