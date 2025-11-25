// const Input = ({ label, value, onChange, type = "text" }) => {
//   return (
//     <div className="flex flex-col mb-4">
//       <label className="mb-1 font-semibold">{label}</label>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
//       />
//     </div>
//   );
// };

// export default Input;




// import React from 'react';


// export default function Input({ label, name, value, onChange, type='text', required=false, placeholder='' }){
// return (
// <div className="w-full">
// {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}{required && <span className="text-red-500">*</span>}</label>}
// <input
// name={name}
// value={value}
// onChange={onChange}
// type={type}
// placeholder={placeholder}
// className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008c94]/30"
// />
// </div>
// );
// }



// ===== Input.jsx =====
import React from "react";

export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#008c94]"
      />
    </div>
  );
}
