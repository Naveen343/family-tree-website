import { useState } from "react";
import { Lock } from "lucide-react";
import UploadDashboard from "../components/UploadDashboard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AdminLoginModal from "../components/AdminLoginModal";
import { useAdminAuth } from "../hooks/useAdminAuth";

export default function UploadPage() {
  const { isAdmin } = useAdminAuth();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <Header />
      {isAdmin ? (
        <UploadDashboard />
      ) : (
        <div className="bg-[#16202B] min-h-screen text-white mt-16 flex flex-col items-center justify-center px-6 py-24 text-center">
          <Lock className="text-secondary mb-4" size={36} />
          <h1 className="text-2xl font-heading font-bold text-secondary mb-2">
            Admin Access Required
          </h1>
          <p className="text-gray-400 mb-6 max-w-sm">
            Log in with the admin credentials to manage the site.
          </p>
          <button
            onClick={() => setShowLogin(true)}
            className="bg-secondary text-[#16202B] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
          >
            Log In
          </button>
        </div>
      )}
      <Footer />
      {showLogin && !isAdmin && (
        <AdminLoginModal onClose={() => setShowLogin(false)} onSuccess={() => setShowLogin(false)} />
      )}
    </>
  );
}
