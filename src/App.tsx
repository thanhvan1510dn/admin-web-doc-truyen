import React, { useState, useEffect } from "react";
import { ToastProvider } from "./components/common/Toast";
import { AdminLayout, AdminTab } from "./components/admin/AdminLayout";
import { AdminAnalyticsView } from "./components/admin/AdminAnalyticsView";
import { AdminStoryListView } from "./components/admin/AdminStoryListView";
import { AdminChapterUploadView } from "./components/admin/AdminChapterUploadView";
import { AdminPDFUploadStudio } from "./components/admin/AdminPDFUploadStudio";
import { AdminStoryDetailView } from "./components/admin/AdminStoryDetailView";
import { AdminLoginPage } from "./components/auth/AdminLoginPage";
import { authApi } from "./api";

const USER_WEB_URL = import.meta.env.VITE_USER_WEB_URL || "https://web-doc-truyen.vercel.app";

export const AdminAppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authApi.isAuthenticated());
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedStoryId, setSelectedStoryId] = useState<string>("");

  useEffect(() => {
    const unsub = authApi.subscribe((state) => {
      setIsAuthenticated(state.isAuthenticated);
    });
    return () => unsub();
  }, []);

  const handleOpenUserWeb = (storyId?: string, chapterId?: string) => {
    let targetUrl = USER_WEB_URL;
    if (storyId && chapterId) {
      targetUrl = `${USER_WEB_URL}?story=${storyId}&chapter=${chapterId}`;
    } else if (storyId) {
      targetUrl = `${USER_WEB_URL}?story=${storyId}`;
    }
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  if (!isAuthenticated) {
    return <AdminLoginPage onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab)}
      onNavigateToUserWeb={() => handleOpenUserWeb()}
      onLogout={() => {
        authApi.logout();
        setIsAuthenticated(false);
      }}
    >
      {activeTab === "dashboard" && (
        <AdminAnalyticsView
          onSelectStory={(storyId) => {
            setSelectedStoryId(storyId);
            setActiveTab("story-details");
          }}
          onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
        />
      )}

      {activeTab === "stories" && (
        <AdminStoryListView
          onSelectStoryForUpload={(storyId) => {
            setSelectedStoryId(storyId);
            setActiveTab("upload");
          }}
          onSelectStoryForDetails={(storyId) => {
            setSelectedStoryId(storyId);
            setActiveTab("story-details");
          }}
          onPreviewOnUserWeb={(storyId) => {
            handleOpenUserWeb(storyId);
          }}
        />
      )}

      {activeTab === "pdf-upload" && (
          <AdminPDFUploadStudio
            onSuccess={(storyId) => {
              setSelectedStoryId(storyId);
              setActiveTab("story-details");
            }}
          />
        )}

        {activeTab === "upload" && (
        <AdminChapterUploadView
          initialStoryId={selectedStoryId}
          onBack={() => setActiveTab("stories")}
          onSuccess={(storyId) => {
            setSelectedStoryId(storyId);
            setActiveTab("story-details");
          }}
        />
      )}

      {activeTab === "story-details" && (
        <AdminStoryDetailView
          storyId={selectedStoryId}
          onBack={() => setActiveTab("stories")}
          onUploadChapter={(storyId) => {
            setSelectedStoryId(storyId);
            setActiveTab("upload");
          }}
          onReadChapterOnWeb={(storyId, chapterId) => {
            handleOpenUserWeb(storyId, chapterId);
          }}
        />
      )}
    </AdminLayout>
  );
};

export const App: React.FC = () => {
  return (
    <ToastProvider>
      <AdminAppContent />
    </ToastProvider>
  );
};

export default App;
