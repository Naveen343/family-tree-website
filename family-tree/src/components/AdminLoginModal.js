import { useState } from "react";
import { X, Lock } from "lucide-react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export default function AdminLoginModal({ onClose, onSuccess }) {
  const { login } = useAdminAuth();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(id.trim(), password)) {
      setError("");
      onSuccess?.();
    } else {
      setError("Incorrect ID or password.");
    }
  };

  const inputClasses =
    "w-full bg-[#16202B] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-secondary";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[70] px-4">
      <div className="bg-[#1E2A36] border border-white/10 rounded-2xl shadow-2xl w-full max-w-sm">
        <div className="flex items-start justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-secondary" />
            <h3 className="text-lg font-heading font-semibold text-secondary">Admin Login</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">ID</label>
            <input
              autoFocus
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={inputClasses}
              autoComplete="username"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/70 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-secondary text-[#16202B] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
