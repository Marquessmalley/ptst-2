'use client';

import { useChat } from '@ai-sdk/react';
import type { PromptInputMessage } from '@/components/ai-elements/prompt-input';
import { DefaultChatTransport } from 'ai';
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
} from '@/components/ai-elements/prompt-input';
import ChatMessage from '@/components/chatbot/ChatMessage';
import { useCallback, useMemo, useState } from 'react';

const ChatWindow = () => {
  const [text, setText] = useState<string>('');

  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/openai/chat',
    }),
    messages: [
      {
        id: 'welcome',
        role: 'assistant',
        content: '',
        parts: [{ type: 'text', text: 'How can I assist you with today?' }],
      },
    ],
  });

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    [],
  );

  const handleSubmit = (message: PromptInputMessage, e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage({ text });
      setText('');
    }
  };

  const isSubmitDisabled = useMemo(
    () => !(text.trim() || status) || status === 'streaming',
    [text, status],
  );

  return (
    <>
      {/* Conversation area */}
      <Conversation className="flex-1">
        <ConversationContent className="gap-5 px-4 pb-4 pt-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Input area */}
      <div className="shrink-0 border-t border-sky-100 bg-white/80 px-3 py-3 backdrop-blur-sm sm:px-4">
        <PromptInput
          onSubmit={handleSubmit}
          className="rounded-xl border-sky-200/80 bg-white shadow-sm [&>[data-slot=input-group]]:h-auto [&>[data-slot=input-group]]:items-end"
        >
          <PromptInputBody>
            <textarea
              className="max-h-32 min-h-[48px] flex-1 resize-none border-0 bg-transparent px-4 py-3.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-0"
              placeholder="Ask us anything..."
              onChange={handleTextChange}
              value={text}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (text.trim() && !isSubmitDisabled) {
                    const form = e.currentTarget.closest('form');
                    form?.requestSubmit();
                  }
                }
              }}
              rows={1}
            />
            <div className="shrink-0 pb-1.5 pr-1.5">
              <PromptInputSubmit
                disabled={isSubmitDisabled}
                status={status}
                onStop={stop}
                className="size-8 rounded-lg bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-sm hover:from-sky-600 hover:to-sky-500 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:shadow-none"
              />
            </div>
          </PromptInputBody>
        </PromptInput>
      </div>
    </>
  );
};

export default ChatWindow;
