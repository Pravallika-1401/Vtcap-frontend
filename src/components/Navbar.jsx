// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const { logout } = useAuth();

//   return (
//     <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
//       <h2 className="text-xl font-semibold">Admin Dashboard</h2>

//       <button
//         onClick={logout}
//         className="bg-red-600 text-white px-4 py-2 rounded"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Navbar;









// ===== Navbar.jsx =====
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-40">
//       <h2 className="text-lg font-bold">Admin Panel</h2>

//       <div className="flex items-center gap-4">
//         <span className="text-sm text-gray-700">{user?.name || "Admin"}</span>
//         <button
//           onClick={logout}
//           className="px-3 py-1 bg-[#bba14f] text-white rounded-md text-sm"
//         >
//           Logout
//         </button>
//       </div>
//     </header>
//   );
// }



import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30 border-b">
      <div className="flex items-center gap-4">
        <h2 className="text-lg md:text-xl font-bold text-[#0b2343]">Admin Panel</h2>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:inline-block text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
          {user?.username || user?.name || "Admin"}
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-[#bba14f] hover:bg-[#a89045] text-white rounded-md text-sm transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
