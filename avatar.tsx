import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, Loader2, Paperclip, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatWithAIStream } from "@/lib/gemini";

interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
}

export default function ChatTool() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", parts: [{ text: "Hello! I'm Claud io. How can I assist you today?" }] }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", parts: [{ text: userMessage }] }]);
    setIsLoading(true);

    try {
      const history = messages.slice(1);
      const stream = chatWithAIStream(userMessage, history);
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "" }] }]);
      let fullText = "";
      for await (const chunk of stream) {
        fullText += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role === "model") return [...prev.slice(0, -1), { ...last, parts: [{ text: fullText }] }];
          return prev;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "Error encountered." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full glass rounded-[32px] border border-white/10 overflow-hidden shadow-2xl">
      <div className="px-8 py-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
             <MessageSquare className="w-4 h-4 text-purple-400" />
           </div>
           <h2 className="font-black uppercase tracking-widest text-[11px] text-white">AI Assistant v4</h2>
        </div>
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">System Ready</span>
        </div>
      </div>
      <ScrollArea className="flex-1 p-8">
        <div className="space-y-8">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-5 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${m.role === 'model' ? 'bg-purple-600 text-white' : 'bg-white/10 text-white border border-white/10'}`}>
                {m.role === 'model' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[75%] rounded-[24px] p-5 text-sm leading-relaxed font-medium ${m.role === 'user' ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-600/10' : 'bg-white/5 text-gray-200 border border-white/5 shadow-inner'}`}>
                {m.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3 text-purple-400 font-bold text-[10px] uppercase tracking-widest bg-purple-500/5 w-fit px-4 py-2 rounded-full border border-purple-500/10">
              <Loader2 className="animate-spin w-3 h-3" />
              Thinking...
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>
      <div className="p-6 border-t border-white/10 bg-white/5">
        <div className="relative flex items-center gap-4">
          <div className="relative flex-1">
             <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Message Claud io..." 
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 pr-16 h-28 text-white focus:outline-none focus:border-purple-500/50 transition-all font-medium resize-none" 
             />
             <Button 
                onClick={handleSend} 
                disabled={isLoading || !input.trim()} 
                className="absolute right-4 bottom-4 h-12 w-12 bg-white text-black hover:bg-gray-200 rounded-xl shadow-xl transition-all"
             >
                <Send size={20} />
             </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
