import { useState } from "react";
import { Layout, Download, Loader2, Globe, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateWebsite, downloadAsHtml } from "@/lib/gemini";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function WebBuilderTool({ 
  onFocusModeChange, 
  isFocusMode 
}: { 
  onFocusModeChange: (focused: boolean) => void;
  isFocusMode: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [view, setView] = useState<"preview" | "code">("preview");

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const code = await generateWebsite(prompt);
      setGeneratedCode(code);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-4 -m-2">
      <div className="flex items-center justify-between px-6 py-2">
        <div className="flex gap-4 items-center">
           <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
             <Layout className="w-4 h-4 text-blue-400" />
           </div>
           <div>
             <h2 className="text-xl font-black uppercase tracking-tighter text-white">Interface Canvas</h2>
           </div>
        </div>
        {generatedCode && (
          <div className="flex gap-2">
             <Button 
                onClick={() => onFocusModeChange(!isFocusMode)}
                variant="outline"
                className="bg-white/5 border-white/10 text-[9px] uppercase tracking-widest font-black h-8 px-4 rounded-lg text-white hover:bg-white/10 transition-all hover:scale-105"
             >
                {isFocusMode ? 'Exit Focus' : 'Focus Mode'}
             </Button>
             <Button 
                onClick={() => setView(view === 'preview' ? 'code' : 'preview')} 
                variant="outline" 
                className="bg-white/5 border-white/10 text-[9px] uppercase tracking-widest font-black h-8 px-4 rounded-lg text-white hover:bg-white/10"
             >
                {view === 'preview' ? 'Source' : 'Preview'}
             </Button>
             <Button 
                onClick={() => downloadAsHtml(generatedCode, 'index.html')}
                variant="outline"
                className="bg-white/5 border-white/10 text-[9px] uppercase tracking-widest font-black h-8 px-4 rounded-lg text-white hover:bg-white/10"
             >
                <Download className="w-3 h-3 mr-1" />
                Export
             </Button>
          </div>
        )}
      </div>

      <div className="px-6 pb-2">
        <div className="glass rounded-xl border border-white/10 p-2 flex gap-3 shadow-2xl bg-black/40 backdrop-blur-3xl group-focus-within:border-blue-500/30 transition-all">
           <Input 
              value={prompt} 
              onChange={(e) => setPrompt(e.target.value)} 
              placeholder="Architect your next web experience..." 
              className="bg-transparent border-none text-white focus-visible:ring-0 font-medium placeholder:text-gray-700 text-sm flex-1 pl-2" 
           />
           <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !prompt.trim()} 
              className="bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest text-[9px] px-6 h-10 rounded-lg shadow-lg active:scale-95 transition-all"
           >
              Compose
           </Button>
        </div>
      </div>

      <div className={`flex-1 glass-dark rounded-t-[40px] border-t border-x border-white/10 overflow-hidden relative shadow-[0_-20px_50px_-12px_rgba(0,0,0,0.5)] bg-black group/canvas`}>
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-blue-500/50 blur-xl opacity-20 pointer-events-none" />
        
        {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 backdrop-blur-xl">
                <div className="w-20 h-20 border-2 border-blue-500/10 border-t-blue-500 rounded-full animate-spin mb-8 shadow-[0_0_40px_rgba(59,130,246,0.2)]"></div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white animate-pulse">Compiling Structure...</div>
                <div className="text-[10px] uppercase font-bold text-gray-600 mt-4">Analyzing Design Tokens</div>
            </div>
        )}

        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-blue-500/5 to-transparent h-20 opacity-30" />

        <div className="w-full h-full p-2 md:p-4">
            <div className="w-full h-full rounded-[28px] overflow-hidden border border-white/5 bg-white relative">
                {generatedCode && view === "preview" && (
                  <>
                    <iframe srcDoc={generatedCode} className="w-full h-full bg-white transition-opacity duration-1000" />
                    <Button
                      onClick={() => onFocusModeChange(!isFocusMode)}
                      variant="outline"
                      size="icon"
                      className="absolute top-6 right-6 bg-black/10 hover:bg-black/20 border-black/10 backdrop-blur-md rounded-full shadow-xl transition-all opacity-0 group-hover/canvas:opacity-100 z-30"
                    >
                      {isFocusMode ? <Minimize2 className="w-4 h-4 text-black" /> : <Maximize2 className="w-4 h-4 text-black" />}
                    </Button>
                  </>
                )}
                {generatedCode && view === "code" && (
                    <ScrollArea className="h-full p-10 font-mono text-sm leading-relaxed text-gray-300 bg-[#0a0a0a]">
                        <div className="max-w-4xl mx-auto py-10">
                            {generatedCode}
                        </div>
                    </ScrollArea>
                )}
                {!generatedCode && !isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                        <div className="w-32 h-32 rounded-full bg-blue-500/5 flex items-center justify-center mb-8 border border-blue-500/10">
                            <Globe className="w-12 h-12 text-blue-500/40 animate-pulse" />
                        </div>
                        <div className="font-black uppercase tracking-[0.6em] text-xs text-blue-500/40">Ready to Build</div>
                        <p className="text-gray-700 text-[10px] uppercase mt-4 tracking-widest font-bold">Awaiting Instructions</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
