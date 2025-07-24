"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Send, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Здравствуйте! Я виртуальный ассистент УРАЛМЕТАЛЛОМАРКЕТ. Чем могу помочь?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);
  
  // Блокировка скролла при открытом чате на мобильных
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // In a real application, this would be an API call to /api/assistant
      // For this example, we'll simulate a response after a delay
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: "Спасибо за ваш запрос! Я обрабатываю информацию и скоро предоставлю вам ответ по металлопрокату.",
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Извините, произошла ошибка при обработке вашего запроса. Пожалуйста, попробуйте позже.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="safe-area-padding">
      {/* Chat Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className="h-14 w-14 sm:h-16 sm:w-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 touch-target"
          aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
        >
          {isOpen ? (
            <X className="h-6 w-6 sm:h-7 sm:w-7" />
          ) : (
            <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />
          )}
        </Button>
      </motion.div>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 sm:bottom-24 sm:right-6 sm:inset-auto sm:w-96 sm:h-[500px] bg-white dark:bg-steel-800 rounded-lg shadow-xl flex flex-col z-40 border border-gray-200 dark:border-steel-700 safe-area-padding"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 bg-primary text-primary-foreground rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3 bg-primary-foreground text-primary">
                  <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm sm:text-base">Чат с ассистентом</h3>
                  <p className="text-xs sm:text-sm opacity-80">Задайте вопрос о металлопрокате</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 sm:hidden text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 hide-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] p-3 sm:p-4 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 sm:p-4 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Печатает ответ...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 border-t border-gray-200 dark:border-steel-700">
              <div className="flex gap-3">
                <Textarea
                  placeholder="Введите сообщение..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="resize-none min-h-[60px] responsive-input"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                  className="h-[60px] w-12 sm:w-14 touch-target"
                >
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Отправить</span>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
                <MessageSquare className="h-4 w-4" />
              </Avatar>
              <div>
                <h3 className="font-medium">Чат с ассистентом</h3>
                <p className="text-xs opacity-80">Задайте вопрос о металлопрокате</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <p className="text-sm">Печатает ответ...</p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-steel-700">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Введите сообщение..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="resize-none min-h-[60px]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;