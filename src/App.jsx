// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import HeaderPage from "./pages/HeaderPage";
// import HeroPage from "./pages/HeroPage";
// import HomeAboutPage from "./pages/HomeAboutPage";
// import AboutPageEditor from "./pages/AboutPageEditor";
// import ProductsList from "./pages/ProductsList";
// import AddProduct from "./pages/AddProduct";
// import EditProduct from "./pages/EditProduct";
// import GalleryHome from "./pages/GalleryHome";
// import GalleryFull from "./pages/GalleryFull";
// import ContactPage from "./pages/ContactPage";
// import FooterPage from "./pages/FooterPage";

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>

//           {/* Login */}
//           <Route path="/" element={<Login />} />

//           {/* Dashboard */}
//           <Route path="/dashboard" element={<Dashboard />} />

//           {/* Pages */}
//           <Route path="/header" element={<HeaderPage />} />
//           <Route path="/hero" element={<HeroPage />} />
//           <Route path="/about-home" element={<HomeAboutPage />} />
//           <Route path="/about-page" element={<AboutPageEditor />} />

//           {/* Products */}
//           <Route path="/products" element={<ProductsList />} />
//           <Route path="/products/add" element={<AddProduct />} />
//           <Route path="/products/edit/:id" element={<EditProduct />} />

//           {/* Gallery */}
//           <Route path="/gallery-home" element={<GalleryHome />} />
//           <Route path="/gallery-full" element={<GalleryFull />} />

//           <Route path="/contact" element={<ContactPage />} />
//           <Route path="/footer" element={<FooterPage />} />

//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }

// export default App;





import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HeaderPage from "./pages/HeaderPage";
import HeroPage from "./pages/HeroPage";
import HomeAboutPage from "./pages/HomeAboutPage";
import AboutPageEditor from "./pages/AboutPageEditor";
import ProductsList from "./pages/ProductsList";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import BrandsPage from "./pages/BrandsPage";
import GalleryHome from "./pages/GalleryHome";
import GalleryFull from "./pages/GalleryFull";
import ContactPage from "./pages/ContactPage";
import FooterPage from "./pages/FooterPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="flex">
                  <Sidebar />
                  <div className="flex-1 ml-64">
                    <Navbar />
                    <main className="p-6">
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" replace />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/header" element={<HeaderPage />} />
                        <Route path="/hero" element={<HeroPage />} />
                        <Route path="/about-home" element={<HomeAboutPage />} />
                        <Route path="/about-page" element={<AboutPageEditor />} />
                        <Route path="/products" element={<ProductsList />} />
                        <Route path="/brands" element={<BrandsPage />} />
                        <Route path="/products/add" element={<AddProduct />} />
                        <Route path="/products/:id/edit" element={<EditProduct />} />
                        <Route path="/gallery-home" element={<GalleryHome />} />
                        <Route path="/gallery-full" element={<GalleryFull />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/footer" element={<FooterPage />} />
                      </Routes>
                    </main>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;