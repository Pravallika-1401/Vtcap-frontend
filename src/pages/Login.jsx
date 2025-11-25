// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// await axios.post("http://localhost:5000/api/auth/login", {
//   email,
//   password,
// });

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please check your details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2 text-center">
//           Admin Login
//         </h1>
//         <p className="text-sm text-slate-500 mb-6 text-center">
//           Enter your credentials to access the admin panel.
//         </p>

//         {error && (
//           <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//               placeholder="admin@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-slate-800 text-white py-2.5 text-sm font-medium hover:bg-slate-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

// await axios.post(`${API_BASE_URL}/api/auth/login`, {
//   email: form.email,
//   password: form.password,
// });


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please check your details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2 text-center">
//           Admin Login
//         </h1>
//         <p className="text-sm text-slate-500 mb-6 text-center">
//           Enter your credentials to access the admin panel.
//         </p>

//         {error && (
//           <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//               placeholder="admin@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-slate-800 text-white py-2.5 text-sm font-medium hover:bg-slate-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, form);
//       localStorage.setItem("token", data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please check your details."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 sm:p-8">
//         <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-2 text-center">
//           Admin Login
//         </h1>
//         <p className="text-sm text-slate-500 mb-6 text-center">
//           Enter your credentials to access the admin panel.
//         </p>

//         {error && (
//           <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//               placeholder="admin@example.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-lg bg-slate-800 text-white py-2.5 text-sm font-medium hover:bg-slate-900 transition disabled:opacity-60 disabled:cursor-not-allowed"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axiosConfig';
// import { AuthContext } from '../context/AuthContext';


// export default function Login(){
// const [form, setForm] = useState({ email:'', password:'' });
// const [err, setErr] = useState(null);
// const navigate = useNavigate();
// const { setToken, setUser } = useContext(AuthContext);


// const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));


// const handleSubmit = async (e) => {
// e.preventDefault();
// try{
// const res = await axios.post('/auth/login', form);
// const token = res.data.token || res.data.accessToken || res.data; // flexible
// const user = res.data.user || { name: res.data.name };
// setToken(token);
// setUser(user);
// navigate('/dashboard');
// }catch(err){
// setErr(err.response?.data?.message || 'Login failed');
// }
// };


// return (
// <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
// <div className="max-w-md w-full bg-white rounded-lg shadow p-6">
// <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
// {err && <div className="text-red-600 mb-3">{err}</div>}
// <form onSubmit={handleSubmit} className="space-y-4">
// <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-4 py-2 border rounded" />
// <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full px-4 py-2 border rounded" />
// <button className="w-full py-2 bg-[#0b2343] text-white rounded">Login</button>
// </form>
// </div>
// </div>
// );
// }





// ===== Login.jsx =====
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(AuthContext);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);

    try {
      const res = await axios.post("/auth/login", form);

      const token = res.data.token;
      const user = res.data.user;

      setToken(token);
      setUser(user);

      navigate("/dashboard");
    } catch (err) {
      setErr(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        {err && <p className="text-red-600 mb-3">{err}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            name="password"
            required
            value={form.password}
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />

          <button className="w-full py-2 bg-[#0b2343] text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
