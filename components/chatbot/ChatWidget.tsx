"use client";

import { Sparkles, X } from "lucide-react";
import { useState, useCallback } from "react";
import ChatWindow from "@/components/chatbot/ChatWindow";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-hidden border-sky-200/60 bg-gradient-to-br from-sky-50 via-white to-orange-50 shadow-2xl sm:inset-auto sm:bottom-20 sm:right-4 sm:h-[500px] sm:w-[380px] sm:rounded-2xl sm:border lg:h-[560px] lg:w-[400px]">
          {/* Close button (mobile only — on desktop the FAB toggles) */}
          <button
            type="button"
            onClick={toggle}
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/80 text-slate-500 shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:text-slate-700 sm:hidden"
            aria-label="Close chat"
          >
            <X className="size-4" />
          </button>
          <ChatWindow />
        </div>
      )}

      {/* Floating action button */}
      <div className="fixed bottom-4 right-4 z-50">
        {/* Ping ring — only when closed */}
        {!isOpen && (
          <span className="absolute inset-0 animate-ping rounded-full bg-sky-400/40" />
        )}
        <button
          type="button"
          onClick={toggle}
          className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-lg transition-all hover:from-sky-600 hover:to-sky-500 hover:shadow-xl active:scale-95"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          {isOpen ? (
            <X className="size-6" />
          ) : (
            <Sparkles className="size-6 animate-sparkle" />
          )}
        </button>
      </div>
    </>
  );
};

export default ChatWidget;
