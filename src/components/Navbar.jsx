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
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-40">
      <h2 className="text-lg font-bold">Admin Panel</h2>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700">{user?.name || "Admin"}</span>
        <button
          onClick={logout}
          className="px-3 py-1 bg-[#bba14f] text-white rounded-md text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
