import React, { useState } from "react";
import { X, Copy, Check, Download, Upload, RefreshCw, Database } from "lucide-react";
import { storyStorage } from "../../services/storyStorage";
import { useToast } from "../common/Toast";

interface AdminSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminSyncModal: React.FC<AdminSyncModalProps> = ({ isOpen, onClose }) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState("");

  if (!isOpen) return null;

  const stories = storyStorage.getStories({ includeInactive: true });
  const exportData = storyStorage.exportStoriesJson();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportData);
    setCopied(true);
    toast.success("Đã sao chép mã đồng bộ vào bộ nhớ tạm!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `web_doc_truyen_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Đã tải tệp sao lưu .json về máy!");
  };

  const handleImportText = () => {
    if (!importText.trim()) {
      toast.error("Vui lòng dán mã dữ liệu");
      return;
    }
    const success = storyStorage.importStoriesJson(importText.trim());
    if (success) {
      toast.success("Đã nạp dữ liệu thành công!");
      setImportText("");
      onClose();
    } else {
      toast.error("Mã dữ liệu không hợp lệ");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = storyStorage.importStoriesJson(content);
        if (success) {
          toast.success("Đã nạp file dữ liệu thành công!");
          onClose();
        } else {
          toast.error("File dữ liệu không đúng định dạng JSON");
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 bg-zinc-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900">Đồng Bộ & Sao Lưu Dữ Liệu</h3>
              <p className="text-[11px] text-zinc-500">Truyền truyện sang Web Đọc hoặc tải file sao lưu</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 overflow-y-auto">
          {/* Export section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              1. Xuất Dữ Liệu Sang Web Đọc ({stories.length} truyện)
            </h4>
            <p className="text-xs text-zinc-600">
              Sao chép mã này hoặc tải file .json để dán sang <b>Web Đọc Giả</b> (nút "Nạp truyện" trên web đọc):
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Đã sao chép!" : "Sao chép mã đồng bộ"}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-xs font-semibold hover:bg-zinc-50 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-zinc-600" />
                <span>Tải file .json</span>
              </button>
            </div>
          </div>

          <div className="border-t border-zinc-100" />

          {/* Import section */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
              2. Nhập Dữ Liệu / Khôi Phục Dữ Liệu
            </h4>
            <p className="text-xs text-zinc-600">
              Dán mã dữ liệu hoặc tải tệp .json từ thiết bị khác vào đây:
            </p>
            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Dán chuỗi mã JSON vào đây..."
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-zinc-200 bg-zinc-50 text-xs font-mono text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-400"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleImportText}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Nạp mã ngay</span>
              </button>
              <label className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-zinc-200 bg-white text-zinc-800 text-xs font-semibold hover:bg-zinc-50 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-zinc-600" />
                <span>Tải file .json lên</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-100 bg-zinc-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
