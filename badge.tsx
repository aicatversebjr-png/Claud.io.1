import { useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Layout, Gamepad2, Settings, Bell, Search, Plus, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatTool from "./ChatTool";
import WebBuilderTool from "./WebBuilderTool";
import GameBuilderTool from "./GameBuilderTool";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("chat");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const sidebarItems = [
    { id: "chat", icon: MessageSquare, label: "AI Chat" },
    { id: "web", icon: Layout, label: "Web Builder" },
    { id: "game", icon: Gamepad2, label: "Game Builder" },
  ];

  return (
    <div className="flex h-screen bg-mesh overflow-hidden pt-20">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isFocusMode ? 0 : (isSidebarCollapsed ? 80 : 256),
          opacity: isFocusMode ? 0 : 1,
          x: isFocusMode ? -100 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="border-r border-white/10 glass-dark hidden md:flex flex-col relative group overflow-hidden"
      >
        {!isFocusMode && (
          <>
            <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white text-black border border-white/10 flex items-center justify-center z-50 opacity-0 group-hover:opacity-100 transition-opacity shadow-xl"
            >
                {isSidebarCollapsed ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
            </button>

        <div className={`p-6 ${isSidebarCollapsed ? 'px-4' : 'p-6'}`}>
          <Button className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white gap-2 flex items-center justify-center rounded-xl py-6 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-purple-600/20 ${isSidebarCollapsed ? 'px-0' : ''}`}>
            <Plus className="w-4 h-4" />
            {!isSidebarCollapsed && "New Generation"}
          </Button>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1">
            <div className={`text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] px-3 mb-4 mt-2 ${isSidebarCollapsed ? 'text-center px-0' : ''}`}>
               {isSidebarCollapsed ? <Layout size={12} className="mx-auto" /> : "Workspace"}
            </div>
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all uppercase tracking-widest font-black text-[11px] ${
                  activeTab === item.id 
                  ? "bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-inner" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? 'justify-center px-0 text-center' : ''}`}
              >
                <item.icon className="w-4 h-4" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </div>

          <div className="space-y-2 mt-10">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-4">Support</div>
             <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">Templates</span>
             </button>
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-white/5 mt-auto">
          <button className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white w-full transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
          </>
        )}
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-black/20">
        {/* Sub Header */}
        <motion.header 
          animate={{ 
            height: isFocusMode ? 0 : 64,
            opacity: isFocusMode ? 0 : 1,
            y: isFocusMode ? -64 : 0
          }}
          className="border-b border-white/10 flex items-center justify-between px-8 glass-dark overflow-hidden"
        >
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-[11px] uppercase tracking-widest font-black w-full focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all text-white placeholder:text-gray-600"
                placeholder="Search studio..."
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white">
                <Bell className="w-4 h-4" />
             </Button>
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg shadow-purple-500/20" />
          </div>
        </motion.header>

        {/* Dynamic Tool Content */}
        <div className={`flex-1 overflow-hidden transition-all duration-500 ${isFocusMode ? 'p-0' : 'p-6'}`}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full"
          >
            {activeTab === "chat" && <ChatTool />}
            {activeTab === "web" && <WebBuilderTool onFocusModeChange={setIsFocusMode} isFocusMode={isFocusMode} />}
            {activeTab === "game" && <GameBuilderTool onFocusModeChange={setIsFocusMode} isFocusMode={isFocusMode} />}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
