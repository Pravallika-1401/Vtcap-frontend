// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function ContactPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [data, setData] = useState({
//     _id: "",
//     address: "",
//     phone: "",
//     email: "",
//     whatsapp: "",
//     mapEmbedUrl: "",
//   });

//   useEffect(() => {
//     const fetchContact = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/contact`);
//         setData((prev) => ({ ...prev, ...data }));
//       } catch {
//         // ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchContact();
//   }, []);

//   const handleChange = (e) => {
//     setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const url = data._id
//         ? `${API_BASE_URL}/api/contact/${data._id}`
//         : `${API_BASE_URL}/api/contact`;
//       const method = data._id ? "put" : "post";

//       const res = await axios[method](url, data, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       setData((prev) => ({ ...prev, ...res.data }));
//       alert("Contact info saved");
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
//         Contact Information
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Address
//           </label>
//           <textarea
//             name="address"
//             value={data.address}
//             onChange={handleChange}
//             rows={3}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Phone
//             </label>
//             <input
//               type="text"
//               name="phone"
//               value={data.phone}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               WhatsApp (optional)
//             </label>
//             <input
//               type="text"
//               name="whatsapp"
//               value={data.whatsapp}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             name="email"
//             value={data.email}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Google Maps Embed URL
//           </label>
//           <input
//             type="text"
//             name="mapEmbedUrl"
//             value={data.mapEmbedUrl}
//             onChange={handleChange}
//             className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             placeholder="https://www.google.com/maps/embed?..."
//           />
//           <p className="text-xs text-slate-400 mt-1">
//             Paste the iframe src URL from Google Maps embed.
//           </p>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1">
//             <p className="text-sm font-medium text-slate-700 mb-1">
//               Map Preview
//             </p>
//             {data.mapEmbedUrl ? (
//               <iframe
//                 title="Map preview"
//                 src={data.mapEmbedUrl}
//                 className="w-full h-48 rounded-xl border border-slate-200"
//                 loading="lazy"
//                 referrerPolicy="no-referrer-when-downgrade"
//               />
//             ) : (
//               <p className="text-xs text-slate-400">
//                 Map will appear here after you paste the embed URL.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save Contact Info"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }





// src/pages/ContactPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import Input from "../components/Input";

export default function ContactPage() {
  const [contact, setContact] = useState({ phone: "", email: "", address: "", mapEmbedUrl: "", whatsapp: "" });
  const [loading, setLoading] = useState(false);

  useEffect(()=>{ (async ()=>{ try{ const res = await axios.get("/contact"); if(res.data) setContact(res.data); }catch(e){console.error(e);} })(); }, []);

  const handle = (e)=> setContact({...contact, [e.target.name]: e.target.value});

  async function save(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put("/contact", contact);
      setContact(res.data);
      alert("Contact updated");
    } catch (err) { console.error(err); alert("Error"); }
    finally { setLoading(false); }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contact Settings</h2>
      <form onSubmit={save} className="space-y-3">
        <Input label="Phone" name="phone" value={contact.phone || ""} onChange={handle} />
        <Input label="WhatsApp" name="whatsapp" value={contact.whatsapp || ""} onChange={handle} />
        <Input label="Email" name="email" value={contact.email || ""} onChange={handle} />
        <div>
          <label className="block mb-1">Address</label>
          <textarea name="address" value={contact.address || ""} onChange={handle} rows="4" className="w-full p-2 border rounded" />
        </div>
        <Input label="Google Map Embed URL" name="mapEmbedUrl" value={contact.mapEmbedUrl || ""} onChange={handle} />
        <button disabled={loading} className="px-4 py-2 bg-indigo-600 text-white rounded">{loading ? "Saving..." : "Save Contact"}</button>
      </form>
    </div>
  );
}
