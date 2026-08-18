import React, { useState } from "react";
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle, Sun, Moon } from "lucide-react";
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
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("admin_theme");
      if (saved === "light" || saved === "dark") return saved;
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "dark";
  });

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("admin_theme", next);
  };

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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-center items-center p-4 relative transition-colors duration-150">
      {/* Theme Toggle in Corner */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-sm"
        title="Đổi giao diện Sáng / Tối"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Login Box */}
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center mx-auto mb-2 font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <h1 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">
            Admin Quản Trị
          </h1>
          <p className="text-xs text-zinc-500">
            Hệ thống quản lý truyện & nội dung
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
              Tài khoản
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMsg("");
              }}
              placeholder="admin"
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
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
                placeholder="admin123"
                className="w-full pl-3 pr-9 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-zinc-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
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
                className="rounded text-zinc-900 dark:text-white w-3.5 h-3.5"
              />
              <span className="text-[11px]">Ghi nhớ đăng nhập</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 mt-2"
          >
            <span>{loading ? "Đang xử lý..." : "Đăng nhập"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <button
              type="button"
              onClick={() => {
                setUsername("admin");
                setPassword("admin123");
                setErrorMsg("");
              }}
              className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 font-mono"
            >
              admin / admin123 (Điền nhanh)
            </button>
          </div>
        </form>
      </div>

      <p className="text-[11px] text-zinc-400 mt-6">
        Admin Portal • Minimalist
      </p>
    </div>
  );
};
