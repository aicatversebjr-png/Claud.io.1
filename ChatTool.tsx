import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Play, Sparkles, Code, Gamepad2, MessageSquare, ArrowRight } from "lucide-react";

export default function Hero({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-mesh">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-purple/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-blue/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-purple-300">Next Gen AI Engine v4.0 Active</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-7xl md:text-[110px] font-black tracking-tighter uppercase mb-8 leading-[0.85]"
            >
              Build <br />
              <span className="text-gradient">Anything</span> <br />
              With AI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed font-medium"
            >
              Generate high-performance websites, immersive 2D games, and production-ready code with a single prompt. The ultimate AI studio for builders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <Button 
                  onClick={onGetStarted}
                  className="h-16 px-10 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 group shadow-xl shadow-purple-600/20"
              >
                Start Building
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button className="h-16 px-10 bg-white/5 border border-white/10 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all text-white">
                Watch Demo
              </Button>
            </motion.div>

            <div className="flex items-center gap-12 mt-12 pt-12 border-t border-white/10">
              {[
                { val: "12M+", label: "Assets Created" },
                { val: "99.9%", label: "Uptime Record" },
                { val: "24/7", label: "AI Monitoring" }
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-black">{stat.val}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="glass-dark rounded-[32px] border border-white/10 p-6 shadow-2xl overflow-hidden aspect-[4/3] transform rotate-[-2deg] relative z-20">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="px-3 py-1 bg-white/10 rounded-md text-[10px] font-mono text-gray-300">cloud_project_v1.jsx</div>
                </div>
                <div className="flex-1 font-mono text-[11px] text-gray-400 overflow-hidden leading-relaxed mb-6 h-32">
                    <span className="text-blue-400">const</span> <span className="text-purple-400">App</span> = () =&gt; {"{"}<br/>
                    &nbsp;&nbsp;<span className="text-gray-500">// Initializing AI Layer</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-400">const</span> engine = <span className="text-yellow-400">useClaudEngine</span>();<br/><br/>
                    &nbsp;&nbsp;<span className="text-blue-400">return</span> (<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">Container</span>&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-green-400">AI_Mesh</span> intensity={"{"}<span className="text-orange-400">0.8</span>{"}"} /&gt;<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-green-400">Container</span>&gt;<br/>
                    &nbsp;&nbsp;);<br/>
                    {"}"};
                </div>
                <div className="h-14 bg-purple-600 rounded-xl flex items-center justify-center font-black uppercase tracking-widest text-xs shadow-lg shadow-purple-600/40 text-white">
                  Deploying to production...
                </div>
              </div>

              <motion.div 
                animate={{ y: [0, -15, 0], rotate: [3, 2, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-4 -top-10 w-[260px] glass rounded-3xl p-5 shadow-2xl border border-white/20 z-30 hidden xl:block"
              >
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500"></div>
                   <div className="flex flex-col text-left">
                     <span className="text-xs font-bold text-white">AI Assistant</span>
                     <span className="text-[9px] text-green-400 font-bold uppercase tracking-widest">Online</span>
                   </div>
                </div>
                <p className="text-[10px] text-gray-300 bg-black/20 p-3 rounded-xl leading-relaxed border border-white/5 text-left">
                  I've optimized the layout and added three 3D game logic modules. Ready to preview?
                </p>
              </motion.div>

              <motion.div 
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-10 -left-10 w-[200px] glass rounded-3xl p-5 shadow-2xl border border-white/10 z-10 hidden xl:block"
              >
                <div className="text-[10px] uppercase text-indigo-300 font-bold mb-3 tracking-widest text-left">Generation Speed</div>
                <div className="flex items-end gap-1.5 h-12">
                   {[40, 60, 90, 50, 70].map((h, i) => (
                     <div key={i} className={`flex-1 rounded-sm ${i === 2 ? 'bg-purple-500' : 'bg-white/10'}`} style={{ height: `${h}%` }} />
                   ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
