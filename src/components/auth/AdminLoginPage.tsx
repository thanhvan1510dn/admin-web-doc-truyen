import React, { useState } from "react";
import { 
  Lock, Eye, EyeOff, ArrowRight, AlertCircle
} from "lucide-react";
import { authApi } from "../../api";
import { useToast } from "../common/Toast";

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const toast = useToast();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg("Vui lòng nhập tài khoản Super Admin");
      return;
    }
    if (!password) {
      setErrorMsg("Vui lòng nhập mật khẩu");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const res = await authApi.login({
      username,
      password,
      rememberMe,
    });

    setLoading(false);

    if (res.success) {
      toast.success("Đăng nhập Super Admin thành công!");
      onLoginSuccess();
    } else {
      setErrorMsg(res.error || "Tên đăng nhập hoặc mật khẩu không chính xác");
      toast.error(res.error || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-amber-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl p-8 space-y-6 relative z-10 animate-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-xl shadow-amber-500/25 mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mt-2">
            Đăng Nhập Super Admin
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Hệ thống Quản trị Web Đọc Truyện độc quyền dành cho Chủ sở hữu.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold flex items-center gap-2 animate-in shake duration-150">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Tài khoản Super Admin
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMsg("");
              }}
              placeholder="admin"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Mật khẩu truy cập
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer select-none font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>
            <span className="text-[11px] text-amber-400 font-semibold">
              Bảo mật 1 chủ sở hữu
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-98 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-3"
          >
            <span>{loading ? "Đang xác thực..." : "Đăng nhập Super Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Fill for Owner */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                setUsername("admin");
                setPassword("admin123");
                setErrorMsg("");
              }}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-400 transition-colors border border-amber-500/20"
            >
              👑 Điền nhanh Super Admin (admin / admin123)
            </button>
          </div>
        </form>
      </div>

      <p className="text-xs text-slate-600 mt-6 text-center">
        © 2026 Admin Web Đọc Truyện • Super Admin Exclusive
      </p>
    </div>
  );
};
