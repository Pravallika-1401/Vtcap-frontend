// import { useEffect, useState } from "react";
// import axios from "axios";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function GalleryFull() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [newItem, setNewItem] = useState({
//     title: "",
//     imageFile: null,
//     isFeatured: false,
//   });

//   const fetchImages = async () => {
//     try {
//       const { data } = await axios.get(`${API_BASE_URL}/gallery`);
//       setImages(data);
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to load gallery");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) setNewItem((prev) => ({ ...prev, imageFile: file }));
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setNewItem((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleCreate = async (e) => {
//     e.preventDefault();
//     if (!newItem.imageFile) {
//       alert("Please select an image");
//       return;
//     }
//     setSaving(true);
//     try {
//       const formData = new FormData();
//       formData.append("title", newItem.title);
//       formData.append("isFeatured", newItem.isFeatured);
//       formData.append("image", newItem.imageFile);

//       await axios.post(`${API_BASE_URL}/gallery`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       setNewItem({ title: "", imageFile: null, isFeatured: false });
//       await fetchImages();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to add image");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this image?")) return;
//     try {
//       await axios.delete(`${API_BASE_URL}/gallery/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setImages((prev) => prev.filter((i) => i._id !== id));
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to delete");
//     }
//   };

//   const handleToggleFeatured = async (id) => {
//     try {
//       await axios.patch(
//         `${API_BASE_URL}/gallery/${id}/toggle-featured`,
//         {},
//         { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//       );
//       await fetchImages();
//     } catch (err) {
//       alert(err.response?.data?.message || "Failed to update");
//     }
//   };

//   return (
//     <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
//           Gallery (All Images)
//         </h1>
//         <p className="text-sm text-slate-500">
//           Upload new images, delete old ones and choose which are featured on
//           the home gallery.
//         </p>
//       </div>

//       {/* Add new image */}
//       <form
//         onSubmit={handleCreate}
//         className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
//       >
//         <h2 className="text-sm font-semibold text-slate-700">
//           Add New Gallery Image
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Title (optional)
//             </label>
//             <input
//               type="text"
//               name="title"
//               value={newItem.title}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center gap-2 mt-1 md:mt-7">
//             <input
//               id="newIsFeatured"
//               type="checkbox"
//               name="isFeatured"
//               checked={newItem.isFeatured}
//               onChange={handleChange}
//               className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
//             />
//             <label
//               htmlFor="newIsFeatured"
//               className="text-sm font-medium text-slate-700"
//             >
//               Featured on home
//             </label>
//           </div>
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-slate-700 mb-1">
//             Image File
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
//           />
//         </div>

//         <div className="flex justify-end">
//           <button
//             type="submit"
//             disabled={saving}
//             className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
//           >
//             {saving ? "Uploading..." : "Add Image"}
//           </button>
//         </div>
//       </form>

//       {/* List */}
//       {loading ? (
//         <p>Loading gallery...</p>
//       ) : images.length === 0 ? (
//         <p className="text-sm text-slate-500">No images uploaded yet.</p>
//       ) : (
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//           {images.map((img) => (
//             <div
//               key={img._id}
//               className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
//             >
//               <img
//                 src={img.imageUrl}
//                 alt={img.title}
//                 className="h-32 sm:h-40 w-full object-cover"
//               />
//               <div className="p-2 flex-1 flex flex-col gap-2">
//                 <p className="text-xs font-medium text-slate-700 truncate">
//                   {img.title || "Gallery image"}
//                 </p>
//                 <div className="flex items-center justify-between gap-2 mt-auto">
//                   <button
//                     onClick={() => handleToggleFeatured(img._id)}
//                     className={`text-[10px] px-2 py-1 rounded-full border text-xs ${
//                       img.isFeatured
//                         ? "bg-green-50 border-green-200 text-green-700"
//                         : "bg-slate-50 border-slate-200 text-slate-700"
//                     }`}
//                   >
//                     {img.isFeatured ? "Featured" : "Make Featured"}
//                   </button>
//                   <button
//                     onClick={() => handleDelete(img._id)}
//                     className="text-[10px] px-2 py-1 rounded-full border border-red-200 text-red-600"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }








import { useEffect, useState } from "react";
// import axios from "axios";
import axios from "../api/axiosConfig";


// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function GalleryFull() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    imageFile: null,
    isFeatured: false,
  });

  const fetchImages = async () => {
    try {
      // const { data } = await axios.get(`${API_BASE_URL}/gallery`);
      const { data } = await axios.get(`/api/gallery`);
      setImages(data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) setNewItem((prev) => ({ ...prev, imageFile: file }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newItem.imageFile) {
      alert("Please select an image");
      return;
    }
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", newItem.title);
      formData.append("isFeatured", newItem.isFeatured);
      formData.append("image", newItem.imageFile);

      await axios.post(`/api/gallery`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setNewItem({ title: "", imageFile: null, isFeatured: false });
      await fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add image");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`/api/gallery/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setImages((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await axios.patch(
        `/api/gallery/${id}/toggle-featured`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      await fetchImages();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2">
          Gallery (All Images)
        </h1>
        <p className="text-sm text-slate-500">
          Upload new images, delete old ones and choose which are featured on
          the home gallery.
        </p>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 sm:p-6 space-y-4"
      >
        <h2 className="text-sm font-semibold text-slate-700">
          Add New Gallery Image
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Title (optional)
            </label>
            <input
              type="text"
              name="title"
              value={newItem.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 mt-1 md:mt-7">
            <input
              id="newIsFeatured"
              type="checkbox"
              name="isFeatured"
              checked={newItem.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-slate-300 text-slate-800 focus:ring-slate-500"
            />
            <label
              htmlFor="newIsFeatured"
              className="text-sm font-medium text-slate-700"
            >
              Featured on home
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Image File
          </label>
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChange}
            className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-slate-100 hover:file:bg-slate-200"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-medium hover:bg-slate-900 disabled:opacity-60"
          >
            {saving ? "Uploading..." : "Add Image"}
          </button>
        </div>
      </form>

      {loading ? (
        <p>Loading gallery...</p>
      ) : images.length === 0 ? (
        <p className="text-sm text-slate-500">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex flex-col"
            >
              <img
                src={img.imageUrl}
                alt={img.title}
                className="h-32 sm:h-40 w-full object-cover"
              />
              <div className="p-2 flex-1 flex flex-col gap-2">
                <p className="text-xs font-medium text-slate-700 truncate">
                  {img.title || "Gallery image"}
                </p>
                <div className="flex items-center justify-between gap-2 mt-auto">
                  <button
                    onClick={() => handleToggleFeatured(img._id)}
                    className={`text-[10px] px-2 py-1 rounded-full border text-xs ${
                      img.isFeatured
                        ? "bg-green-50 border-green-200 text-green-700"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    {img.isFeatured ? "Featured" : "Make Featured"}
                  </button>

                  <button
                    onClick={() => handleDelete(img._id)}
                    className="text-[10px] px-2 py-1 rounded-full border border-red-200 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
