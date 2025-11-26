// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function HeroPage() {
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [hero, setHero] = useState({
//     _id: "",
//     title: "",
//     subtitle: "",
//     buttonText: "",
//     buttonLink: "",
//     backgroundUrl: "",
//     backgroundFile: null,
//   });

//   useEffect(() => {
//     const fetchHero = async () => {
//       try {
//         const { data } = await axios.get(`${API_BASE_URL}/api/hero`);
//         setHero((prev) => ({ ...prev, ...data }));
//       } catch {
//         // ignore
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchHero();
//   }, []);

//   const handleChange = (e) => {
//     setHero((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setHero((prev) => ({ ...prev, backgroundFile: file }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//       const formData = new FormData();
//       formData.append("title", hero.title);
//       formData.append("subtitle", hero.subtitle);
//       formData.append("buttonText", hero.buttonText);
//       formData.append("buttonLink", hero.buttonLink);
//       if (hero.backgroundFile) formData.append("backgroundImage", hero.backgroundFile);

//       const url = hero._id
//         ? `${API_BASE_URL}/api/hero/${hero._id}`
//         : `${API_BASE_URL}/api/hero`;
//       const method = hero._id ? "put" : "post";

//       const { data } = await axios[method](url, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setHero((prev) => ({ ...prev, ...data, backgroundFile: null }));
//       alert("Hero section updated");
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to save hero");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return <div className="px-4 py-6">Loading hero...</div>;

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
//       <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4">
//         Home Hero Section
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={hero.title}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Subtitle
//             </label>
//             <textarea
//               name="subtitle"
//               value={hero.subtitle}
//               onChange={handleChange}
//               rows={3}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Button Text
//             </label>
//             <input
//               type="text"
//               name="buttonText"
//               value={hero.buttonText}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Button Link
//             </label>
//             <input
//               type="text"
//               name="buttonLink"
//               value={hero.buttonLink}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//               placeholder="#products"
//             />
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-4 md:items-center">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Background Image
//             </label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileChange}
//               className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
//             />
//           </div>
//           {hero.backgroundUrl && (
//             <div className="flex justify-center md:justify-end">
//               <img
//                 src={hero.backgroundUrl}
//                 alt="Hero bg"
//                 className="h-24 w-full max-w-xs object-cover rounded-lg border border-slate-200"
//               />
//             </div>
//           )}
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//           >
//             {saving ? "Saving..." : "Save Hero"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }



// src/pages/HeroPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "../api/axiosConfig";
// import ImageUpload from "../components/ImageUpload";
// import Input from "../components/Input";

// export default function HeroPage() {
//   const [hero, setHero] = useState({ title: "", subtitle: "", buttonText: "", buttonLink: "" });
//   const [bgFile, setBgFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadHero();
//   }, []);

//   async function loadHero() {
//     try {
//       const res = await axios.get("/hero");
//       if (res.data) {
//         setHero({
//           category: res.data.category || "",
//           title: res.data.title || "",
//           Description: res.data.Description || "",
//           // subtitle: res.data.subtitle || "",
//           // buttonText: res.data.buttonText || "",
//           // buttonLink: res.data.buttonLink || "",
//         });
//         setPreview(res.data.backgroundUrl || "");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const onFile = (file, url) => {
//     setBgFile(file);
//     setPreview(url);
//   };

//   const handleChange = (e) => setHero({ ...hero, [e.target.name]: e.target.value });

//   async function submit(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const form = new FormData();
//       if (bgFile) form.append("backgroundImage", bgFile); // backend expects backgroundImage per route earlier
//       form.append("title", hero.title);
//       form.append("Description", hero.Description);
//       form.append("category", hero.category);
//       // form.append("subtitle", hero.subtitle);
//       // form.append("buttonText", hero.buttonText);
//       // form.append("buttonLink", hero.buttonLink);

//       const res = await axios.put(`/hero/${hero._id}`, form, { headers: { "Content-Type": "multipart/form-data" } });
//       setHero({
//         title: res.data.title || hero.title,
//         // subtitle: res.data.subtitle || hero.subtitle,
//         // buttonText: res.data.buttonText || hero.buttonText,
//         // buttonLink: res.data.buttonLink || hero.buttonLink,
//         category: res.data.title || hero.category,
//         Description: res.data.title || hero.Description,
//       });
//       setPreview(res.data.backgroundUrl || preview);
//       alert("Hero updated");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleSave = async () => {
//   const formData = new FormData();
//   formData.append("title", hero.title);
//   formData.append("description", hero.description);
//   formData.append("category", hero.category);
//   if (bgFile) {
//     formData.append("bgImage", bgFile);
//   }

//   try {
//     if (hero._id) {
//       // Update API
//       await axios.put(`/api/hero/${hero._id}`, formData);
//       alert("Hero updated successfully!");
//     } else {
//       // Create API
//       await axios.post("/api/hero", formData);
//       alert("Hero created successfully!");
//     }
//   } catch (error) {
//     console.error("Error saving hero:", error);
//     alert("Failed to save hero");
//   }
// };


//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Edit Hero Section</h2>
//       <form onSubmit={submit} className="space-y-4">
//         <ImageUpload onFileChange={onFile} existingPreview={preview} inputName="backgroundImage" />
//         <Input label="Title" name="title" value={hero.title} onChange={handleChange} />
//         <Input label="Description" name="Description" value={hero.Description} onChange={handleChange} />
//         <Input label="category" name="category" value={hero.category} onChange={handleChange} />

//         {/* <Input label="Subtitle" name="subtitle" value={hero.subtitle} onChange={handleChange} />
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <Input label="Button Text" name="buttonText" value={hero.buttonText} onChange={handleChange} />
//           <Input label="Button Link" name="buttonLink" value={hero.buttonLink} onChange={handleChange} />
//         </div> */}

//         <div>
//           <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
//             {loading ? "Saving..." : "Save Hero"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }





// src/pages/HeroPage.jsx
// import React, { useEffect, useState } from "react";
// import axios from "../api/axiosConfig";
// import ImageUpload from "../components/ImageUpload";
// import Input from "../components/Input";

// export default function HeroPage() {
//   const [hero, setHero] = useState({
//     _id: "",
//     title: "",
//     Description: "",
//     category: ""
//   });
//   const [bgFile, setBgFile] = useState(null);
//   const [preview, setPreview] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadHero();
//   }, []);

//   async function loadHero() {
//     try {
//       const res = await axios.get("/hero");
//       if (res.data) {
//         setHero({
//           _id: res.data._id,       // 👈 important
//           category: res.data.category || "",
//           title: res.data.title || "",
//           Description: res.data.Description || "",
//         });
//         setPreview(res.data.backgroundUrl || "");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   const onFile = (file, url) => {
//     setBgFile(file);
//     setPreview(url);
//   };

//   const handleChange = (e) =>
//     setHero({ ...hero, [e.target.name]: e.target.value });

//   async function submit(e) {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const form = new FormData();
//       if (bgFile) form.append("backgroundImage", bgFile);
//       form.append("title", hero.title);
//       form.append("Description", hero.Description);
//       form.append("category", hero.category);

//       // 👇 FIXED API endpoint (add id) — no more 404
//       const res = await axios.put(`/hero/${hero._id}`, form, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setHero({
//         _id: res.data._id,
//         title: res.data.title || hero.title,
//         category: res.data.category || hero.category,
//         Description: res.data.Description || hero.Description,
//       });
//       setPreview(res.data.backgroundUrl || preview);
//       alert("Hero updated");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Edit Hero Section</h2>
//       <form onSubmit={submit} className="space-y-4">
//         <ImageUpload onFileChange={onFile} existingPreview={preview} inputName="backgroundImage" />
//         <Input label="Title" name="title" value={hero.title} onChange={handleChange} />
//         <Input label="Description" name="Description" value={hero.Description} onChange={handleChange} />
//         <Input label="category" name="category" value={hero.category} onChange={handleChange} />

//         <div>
//           <button type="submit" disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
//             {loading ? "Saving..." : "Save Hero"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }





// src/pages/HeroPage.jsx
import React, { useEffect, useState } from "react";
import axios from "../api/axiosConfig";
import ImageUpload from "../components/ImageUpload";
import Input from "../components/Input";

export default function HeroPage() {
  const [hero, setHero] = useState({
    _id: "",
    title: "",
    Description: "",
    category: ""
  });
  const [bgFile, setBgFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHero();
  }, []);

// useEffect(() => {
//   heroAPI.get().then((res) => {
//     setSlides(res.data.slides); // res.data.slides endukante admin route full object return chestundi
//   });
// }, []);




  // async function loadHero() {
  //   try {
  //     // const res = await axios.get("/hero");
  //     const res = await axios.get("/hero/admin-data");
  //     if (res.data) {
  //       setHero({
  //         _id: res.data._id || res.data.id,              // 👈 _id secured
  //         category: res.data.category || "",
  //         title: res.data.title || "",
  //         Description: res.data.Description || res.data.description || "",
  //       });
  //       setPreview(res.data.backgroundUrl || "");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }


  async function loadHero() {
  try {
    const res = await axios.get("/hero/admin-data");
    const slide = res.data.slides?.[0]; // first slide load

    if (slide) {
      setHero({
        _id: res.data._id,
        title: slide.title || "",
        Description: slide.description || "",
        category: slide.category || "",
      });
      setPreview(slide.image || "");
    }
  } catch (err) {
    console.error(err);
  }
}


  const onFile = (file, url) => {
    setBgFile(file);
    setPreview(url);
  };

  const handleChange = (e) =>
    setHero({ ...hero, [e.target.name]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData();
      if (bgFile) form.append("backgroundImage", bgFile);
      form.append("title", hero.title);
      form.append("Description", hero.Description);
      form.append("category", hero.category);

      // 👇 update API (correct route)
      const res = await axios.put(`/hero/${hero._id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setHero({
        _id: res.data._id || res.data.id,
        title: res.data.title,
        category: res.data.category,
        Description: res.data.Description || res.data.description,
      });

      setPreview(res.data.backgroundUrl || preview);
      alert("Hero updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Hero Section</h2>
      <form onSubmit={submit} className="space-y-4">
        <ImageUpload
          onFileChange={onFile}
          existingPreview={preview}
          inputName="backgroundImage"
        />
        <Input
          label="Title"
          name="title"
          value={hero.title}
          onChange={handleChange}
        />
        <Input
          label="Description"
          name="Description"
          value={hero.Description}
          onChange={handleChange}
        />
        <Input
          label="category"
          name="category"
          value={hero.category}
          onChange={handleChange}
        />

        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            {loading ? "Saving..." : "Save Hero"}
          </button>
        </div>
      </form>
    </div>
  );
}
