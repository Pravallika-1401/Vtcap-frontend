// const ImageUpload = ({ label, onChange }) => {
//   return (
//     <div className="mb-4">
//       <label className="font-semibold">{label}</label>
//       <input
//         type="file"
//         onChange={(e) => onChange(e.target.files[0])}
//         className="mt-2"
//       />
//     </div>
//   );
// };

// export default ImageUpload;




// import React, { useState } from 'react';
// const [file, setFile] = useState(null);
// const [preview, setPreview] = useState(null);
// const [loading, setLoading] = useState(false);
// const [error, setError] = useState(null);


// const handleFile = (e) => {
// const f = e.target.files[0];
// if (!f) return;
// setFile(f);
// setPreview(URL.createObjectURL(f));
// };


// const handleUpload = async () => {
// if (!file) return setError('Please choose a file');
// setLoading(true);
// setError(null);
// try {
// const fd = new FormData();
// fd.append(fieldName, file);
// const res = await axios.post(uploadUrl, fd, {
// headers: { 'Content-Type': 'multipart/form-data' }
// });
// setFile(null);
// setPreview(null);
// onSuccess && onSuccess(res.data);
// } catch (err) {
// setError(err.response?.data?.message || err.message || 'Upload failed');
// }
// setLoading(false);
// };


// return (
// <div className="w-full">
// <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
// <div className="flex flex-col sm:flex-row gap-3 items-start">
// <input
// type="file"
// accept="image/*"
// onChange={handleFile}
// className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#0b2343] file:text-white"
// />
// <div className="flex gap-2 items-center">
// <button
// onClick={handleUpload}
// disabled={loading}
// className="px-4 py-2 bg-[#0b2343] text-white rounded-md shadow-sm disabled:opacity-50"
// >
// {loading ? 'Uploading...' : 'Upload'}
// </button>
// </div>
// </div>


// {preview && (
// <div className="mt-3">
// <img src={preview} alt="preview" className="w-48 h-32 object-cover rounded-md shadow" />
// </div>
// )}


// {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
// </div>
// );


// import React from "react";

// export default function ImageUpload({ label, onChange, value }) {
//   return (
//     <div className="w-full">
//       <label className="block text-sm font-medium text-gray-700 mb-2">
//         {label}
//       </label>

//       <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={onChange}
//           className="block w-full text-sm text-gray-900 bg-white border border-gray-300 rounded-lg p-2 cursor-pointer focus:outline-none"
//         />

//         {value && (
//           <img
//             src={value}
//             alt="Preview"
//             className="w-24 h-24 object-cover rounded-lg shadow-md border"
//           />
//         )}
//       </div>
//     </div>
//   );
// }




// ===== ImageUpload.jsx =====
// import React, { useState } from "react";
// import axios from "../api/axiosConfig";

// export default function ImageUpload({ uploadUrl, fieldName = "image", onSuccess }) {
//   const [file, setFile] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFile = (e) => {
//     const f = e.target.files[0];
//     if (!f) return;
//     setFile(f);
//     setPreview(URL.createObjectURL(f));
//   };

// const [imageData, setImageData] = useState({ file: null, preview: "" });

// const handleImageChange = (file, previewUrl) => {
//   setImageData({ file, preview: previewUrl });
// };

// <ImageUpload 
//   onFileChange={handleImageChange} 
//   existingPreview={imageData.preview} 
//   inputName="logo" 
// />


//   const handleUpload = async () => {
//     if (!file) return setError("Please select an image");

//     setError(null);
//     setLoading(true);

//     try {
//       const fd = new FormData();
//       fd.append(fieldName, file);

//       const res = await axios.post(uploadUrl, fd, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       onSuccess && onSuccess(res.data);
//       setFile(null);
//       setPreview(null);
//     } catch (err) {
//       setError(err.response?.data?.message || "Upload failed");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="w-full space-y-2">
//       <label className="block text-sm font-medium">Upload Image</label>

//       <div className="flex flex-col sm:flex-row gap-3">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleFile}
//           className="w-full text-sm file:px-4 file:py-2 file:bg-[#0b2343] file:text-white file:border-0 file:rounded"
//         />

//         <button
//           disabled={loading}
//           onClick={handleUpload}
//           className="px-4 py-2 bg-[#0b2343] text-white rounded disabled:opacity-50"
//         >
//           {loading ? "Uploading..." : "Upload"}
//         </button>
//       </div>

//       {preview && (
//         <img src={preview} className="w-40 h-28 object-cover rounded shadow" alt="preview" />
//       )}

//       {error && <p className="text-red-500 text-sm">{error}</p>}
//     </div>
//   );
// }



import React, { useState } from "react";

export default function ImageUpload({ onFileChange, existingPreview, inputName }) {
  const [preview, setPreview] = useState(existingPreview || "");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    
    // Call parent's callback
    if (onFileChange) {
      onFileChange(file, previewUrl);
    }
  };

  return (
    <div className="w-full space-y-2">
      <label className="block text-sm font-medium">Upload Image</label>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="file"
          accept="image/*"
          name={inputName}
          onChange={handleFile}
          className="w-full text-sm file:px-4 file:py-2 file:bg-[#0b2343] file:text-white file:border-0 file:rounded"
        />
      </div>

      {(preview || existingPreview) && (
        <img 
          src={preview || existingPreview} 
          className="w-40 h-28 object-cover rounded shadow" 
          alt="preview" 
        />
      )}
    </div>
  );
}