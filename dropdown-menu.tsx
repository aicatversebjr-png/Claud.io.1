import { useState } from "react";
import { Gamepad2, Loader2, Download, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateGame, downloadAsHtml } from "@/lib/gemini";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function GameBuilderTool({ 
  onFocusModeChange, 
  isFocusMode 
}: { 
  onFocusModeChange: (focused: boolean) => void;
  isFocusMode: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const result = await generateGame(prompt);
      setGeneratedCode(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`flex flex-col h-full gap-8 relative ${isFocusMode ? 'p-4 md:p-8' : ''}`}>
      {isFocusMode && (
        <Button 
          onClick={() => onFocusModeChange(false)} 
          size="icon"
          className="absolute top-4 right-4 z-[110] bg-white text-black hover:bg-gray-200 rounded-full shadow-2xl"
        >
          <Minimize2 className="w-5 h-5" />
        </Button>
      )}
      <div className="flex items-center justify-between px-2">
        <div className="flex gap-4 items-center">
           <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
             <Gamepad2 className="w-5 h-5 text-purple-400" />
           </div>
           <div>
             <h2 className="text-2xl font-black uppercase tracking-tighter text-white">Game Machine</h2>
             <p className="text-[10px] uppercase tracking-widest font-bold text-gray-500">System Latency: 12ms</p>
           </div>
        </div>
        <div className="flex gap-3">
            {generatedCode && (
              <>
                <Button 
                    onClick={() => onFocusModeChange(!isFocusMode)}
                    variant="outline"
                    className="bg-white/5 border-white/10 text-[10px] uppercase tracking-widest font-black h-10 px-6 rounded-lg text-white hover:bg-white/10"
                >
                    {isFocusMode ? 'Exit Focus' : 'Focus Mode'}
                </Button>
                <Button 
                    onClick={() => downloadAsHtml(generatedCode, 'game.html')}
                    variant="outline"
                    className="bg-white/5 border-white/10 text-[10px] uppercase tracking-widest font-black h-10 px-6 rounded-lg text-white hover:bg-white/10"
                >
                    <Download className="w-4 h-4 mr-2" />
                    Download Game
                </Button>
              </>
            )}
        </div>
      </div>
      <div className="glass rounded-[24px] border border-white/10 p-3 flex gap-3 shadow-xl bg-white/5">
         <Input 
            value={prompt} 
            onChange={(e) => setPrompt(e.target.value)} 
            placeholder="Define the gameplay mechanics..." 
            className="bg-transparent border-none text-white focus-visible:ring-0 font-medium placeholder:text-gray-600 text-base flex-1 pl-4" 
         />
         <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()} 
            className="bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest text-[10px] px-8 h-12 rounded-xl shadow-lg"
         >
            Ignite Engine
         </Button>
      </div>
      <div className="flex-1 glass-dark rounded-[32px] border border-white/10 overflow-hidden relative shadow-2xl bg-black">
        {isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 backdrop-blur-sm">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-6"></div>
                <div className="text-sm font-black uppercase tracking-[0.3em] text-white animate-pulse">Compiling Mechanics...</div>
            </div>
        )}
        {generatedCode && (
          <>
            <iframe srcDoc={generatedCode} className="w-full h-full bg-white" />
            <Button
              onClick={() => onFocusModeChange(!isFocusMode)}
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 border-white/20 backdrop-blur-md rounded-full shadow-xl transition-all"
            >
              {isFocusMode ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
            </Button>
          </>
        )}
        {!generatedCode && !isGenerating && (
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-20">
                <Gamepad2 className="w-24 h-24 mb-4" />
                <div className="font-black uppercase tracking-[0.5em] text-sm">GPU Render Target</div>
            </div>
        )}
      </div>
    </div>
  );
}
