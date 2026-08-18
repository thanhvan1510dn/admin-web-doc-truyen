import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { authApi } from "../../api";
import { useToast } from "../common/Toast";

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLoginSuccess }) => {
  const toast = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMsg("Vui lòng nhập tài khoản");
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
      toast.success("Đăng nhập thành công");
      onLoginSuccess();
    } else {
      setErrorMsg(res.error || "Tài khoản hoặc mật khẩu không đúng");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-center items-center p-4">
      {/* Login Box */}
      <div className="w-full max-w-sm bg-white rounded-2xl border border-zinc-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center mx-auto mb-2 font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-zinc-900">
            Admin Quản Trị
          </h1>
          <p className="text-xs text-zinc-500">
            Hệ thống quản lý truyện & nội dung
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Tài khoản
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMsg("");
              }}
              placeholder="Nhập tài khoản..."
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Mật khẩu
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
                className="w-full pl-3 pr-9 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-medium text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-0.5">
            <label className="flex items-center gap-2 text-zinc-500 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-zinc-900 w-3.5 h-3.5"
              />
              <span className="text-[11px]">Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
          >
            <span>{loading ? "Đang xử lý..." : "Đăng nhập"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      <p className="text-[11px] text-zinc-400 mt-6">
        Admin Portal • Clean Light Mode
      </p>
    </div>
  );
};
