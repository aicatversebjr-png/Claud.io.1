import { motion } from "motion/react";
import { Cpu, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navbar({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-dark border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/20">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45"></div>
            </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              claud<span className="text-purple-400">.io</span>
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-baseline space-x-8">
              {['Features', 'Tools', 'Pricing', 'Docs'].map((item) => (
                <button
                  key={item}
                  onClick={() => onNavigate(item.toLowerCase())}
                  className="text-gray-400 hover:text-white px-3 py-2 text-sm font-medium transition-colors tracking-tight uppercase tracking-widest font-black text-[11px]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-400 hover:text-white px-4 py-2 text-sm font-medium transition-colors uppercase tracking-widest font-black text-[11px]">Sign In</button>
            <Button 
                onClick={() => onNavigate('dashboard')}
                className="bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-[11px] px-6 py-2 rounded-full shadow-lg shadow-white/5 transition-all"
            >
              Get Started Free
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-dark border-b border-white/10 px-4 pt-2 pb-6 space-y-2"
        >
          {['Features', 'Tools', 'Pricing', 'Docs'].map((item) => (
            <button
              key={item}
              onClick={() => { onNavigate(item.toLowerCase()); setIsOpen(false); }}
              className="block w-full text-left text-gray-300 hover:text-white px-3 py-3 text-base font-medium"
            >
              {item}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-4">
            <Button variant="ghost" className="text-white justify-start">Log in</Button>
            <Button 
              onClick={() => { onNavigate('dashboard'); setIsOpen(false); }}
              className="bg-brand-purple text-white w-full rounded-full"
            >
              Get Started
            </Button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
