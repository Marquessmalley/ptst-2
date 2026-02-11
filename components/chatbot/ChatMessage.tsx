"use client";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Sparkles } from "lucide-react";
import type { UIMessage } from "ai";

interface ChatMessageProps {
  message: UIMessage;
}

const ChatMessage = ({ message }: ChatMessageProps) => (
  <Message from={message.role}>
    {message.parts.map((part, i) => {
      if (part.type === "text") {
        return message.role === "assistant" ? (
          <div key={i} className="flex items-start gap-2.5">
            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-orange-300">
              <Sparkles className="size-3.5 text-white" />
            </div>
            <div className="min-w-0 rounded-xl bg-white/90 px-3.5 py-2.5 text-sm font-light shadow-sm">
              <MessageResponse>{part.text}</MessageResponse>
            </div>
          </div>
        ) : (
          <MessageContent key={i}>{part.text}</MessageContent>
        );
      }
      return null;
    })}
  </Message>
);

export default ChatMessage;
